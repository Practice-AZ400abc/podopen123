"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Globe } from "lucide-react";

const ProfileForm = ({ name, website, onNameChange, onWebsiteChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company-name">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Company Name
          </div>
        </Label>
        <Input
          id="company-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website URL
          </div>
        </Label>
        <Input
          id="website"
          type="url"
          value={website}
          onChange={(e) => onWebsiteChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProfileForm;
