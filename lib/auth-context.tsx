"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { identifyMixpanelUser, resetMixpanelUser } from "@/lib/mixpanel";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        // PGRST205: Table not found - Supabase migration might not be run yet
        // This is expected if profiles table doesn't exist, so we silently handle it
        if (error.code !== 'PGRST205') {
          console.error("Error fetching profile:", error);
        }
        setProfile(null);
        return;
      }

      setProfile(data);
    } catch (err) {
      console.error("Error refreshing profile:", err);
      setProfile(null);
    }
  };

  // Identify user in Mixpanel when both user and profile are available
  useEffect(() => {
    if (user && profile) {
      identifyMixpanelUser(user.id, {
        email: user.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        created_at: profile.created_at,
      });
    }
  }, [user, profile]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Reset Mixpanel user on logout
      resetMixpanelUser();
      
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Error signing out:", error);
      // Still clear local state even if signout fails
      resetMixpanelUser();
      setUser(null);
      setProfile(null);
    }
    
    // Force page reload to clear all state
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        refreshProfile();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        // Wait a bit for profile to be created (if signup just happened)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Create profile if it doesn't exist (for OAuth users or trigger didn't work)
        const { data: existingProfile, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (fetchError || !existingProfile) {
          // Try to get name from user metadata
          const firstName = session.user.user_metadata?.first_name || 
                           session.user.user_metadata?.full_name?.split(" ")[0] || 
                           session.user.user_metadata?.name?.split(" ")[0] || 
                           "User";
          const lastName = session.user.user_metadata?.last_name || 
                          session.user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || 
                          session.user.user_metadata?.name?.split(" ").slice(1).join(" ") || 
                          "";

          const { error: insertError } = await supabase
            .from("profiles")
            .insert([
              {
                id: session.user.id,
                first_name: firstName,
                last_name: lastName || "",
              },
            ]);

          if (insertError) {
            // PGRST205: Table not found - Supabase migration might not be run yet
            if (insertError.code !== 'PGRST205') {
              console.error("Error creating profile:", insertError);
            }
            // Try update in case it was created by trigger in the meantime
            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                first_name: firstName,
                last_name: lastName || "",
              })
              .eq("id", session.user.id);

            if (updateError) {
              // PGRST205: Table not found - Supabase migration might not be run yet
              if (updateError.code !== 'PGRST205') {
                console.error("Error updating profile:", updateError);
              }
            }
          }
        }

        // Always refresh profile after creating/checking
        await refreshProfile();
      } else {
        // Reset Mixpanel user on logout
        resetMixpanelUser();
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Refresh profile when user changes
  useEffect(() => {
    if (user) {
      refreshProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
