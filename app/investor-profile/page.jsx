"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from '@/components/profile/profile-form';
;

const defaultValues = {
  isPublic: false,
  dualCitizenship: false,
  canProvideLiquidityEvidence: false,
  countriesForVisa: [],
};

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to save profile
      console.log(data);
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Manage Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm 
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            defaultValues={defaultValues}
          />
        </CardContent>
      </Card>
    </div>
  );
}