"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COUNTRIES, COUNTRY_CODES, INDUSTRIES, INVESTMENT_RANGES, RELOCATION_TIMEFRAMES } from "@/lib/constants";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import styles for PhoneInput

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const profileSchema = z.object({
  avatar: z.any().optional(),
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(45),
  countryOfBirth: z.string(),
  nationality: z.string(),
  dualCitizenship: z.boolean(),
  netWorth: z.string(),
  liquidAssets: z.string(),
  telegram: z.object({
    countryCode: z.string().optional(),
    number: z.string().max(15).optional()
  }).optional(),
  whatsapp: z.object({
    countryCode: z.string().optional(),
    number: z.string().max(15).optional()
  }).optional(),
  phone: z.object({
    countryCode: z.string().optional(),
    number: z.string().max(15).optional()
  }).optional(),
  industryToInvest: z.string(),
  investmentAmount: z.string(),
  countriesForVisa: z.array(z.string()).min(1).max(4),
  relocationTimeframe: z.string(),
  canProvideLiquidityEvidence: z.boolean(),
  comments: z.string().max(90).optional(),
  isPublic: z.boolean()
});



export function ProfileForm({ onSubmit, isSubmitting, defaultValues }) {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Avatar Upload */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={field.value} />
                    <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.size <= MAX_FILE_SIZE && ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                        // Handle file upload
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={25} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={45} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Country Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="countryOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Birth</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Financial Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="netWorth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Net Worth (USD)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select net worth range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INVESTMENT_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="liquidAssets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liquid Assets (USD)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select liquid assets range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {INVESTMENT_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Information */}
        {/* Add similar form fields for telegram, whatsapp, and phone numbers */}
        <FormField
          control={form.control}
          name="telegram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram Number</FormLabel>
              <FormControl>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={field.value}
                  onChange={field.onChange}
                  className="phone-input" // Optional: Add custom styles if needed
                  placeholder="Enter phone number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>whatsapp Number</FormLabel>
              <FormControl>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={field.value}
                  onChange={field.onChange}
                  className="phone-input" // Optional: Add custom styles if needed
                  placeholder="Enter phone number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telegram Number</FormLabel>
              <FormControl>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={field.value}
                  onChange={field.onChange}
                  className="phone-input" // Optional: Add custom styles if needed
                  placeholder="Enter phone number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Investment Information */}
        <FormField
          control={form.control}
          name="industryToInvest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry to Invest</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="investmentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount willing to invest (in USD dollars)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Amount" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INVESTMENT_RANGES.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* countries to relocate */}

        <FormField
          control={form.control}
          name="countriesForVisa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country to relocate to (where you seek visa) </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relocationTimeframe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timetable to relocate</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a timeframe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RELOCATION_TIMEFRAMES.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="relocationTimeframe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Can you provide evidence of your liquid assets?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comments */}
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    {...field}
                    maxLength={90}
                    className="pr-16"
                  />
                  <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                    {field.value?.length || 0}/90
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Profile Visibility */}
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Public Profile
                </FormLabel>
                <div className="text-sm text-muted-foreground">
                  Make your profile visible to potential sponsors
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Form>
  );
}