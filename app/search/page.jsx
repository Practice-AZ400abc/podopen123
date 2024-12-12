"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, MessageSquare } from "lucide-react";

export default function SearchPage() {
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Python Engineer",
      company: "Tech Corp",
      location: "Jersey City, NJ",
      isNew: true,
      postedDate: "2 days ago",
      skills: ["Python", "Full Stack", "React"],
      description: "Looking for an experienced Python developer...",
    },
    {
      id: 2,
      title: "Python Developer",
      company: "Software Solutions",
      location: "New York, NY",
      isNew: false,
      postedDate: "5 days ago",
      skills: ["Python", "Django", "PostgreSQL"],
      description: "Join our dynamic team of developers...",
    },
    // Add more mock jobs as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="City, state, or zip code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Find jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Filters */}
          <div className="col-span-3">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Date posted</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="last24" />
                      <label htmlFor="last24" className="ml-2 text-sm">Last 24 hours</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="last3" />
                      <label htmlFor="last3" className="ml-2 text-sm">Last 3 days</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="last7" />
                      <label htmlFor="last7" className="ml-2 text-sm">Last 7 days</label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium mb-2">Experience Level</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="entry" />
                      <label htmlFor="entry" className="ml-2 text-sm">Entry Level</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="mid" />
                      <label htmlFor="mid" className="ml-2 text-sm">Mid Level</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="senior" />
                      <label htmlFor="senior" className="ml-2 text-sm">Senior Level</label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="col-span-9">
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                        {job.title}
                      </h2>
                      <p className="text-gray-600 mt-1">{job.company}</p>
                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-gray-600 mt-3">{job.description}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="text-gray-500 text-sm">{job.postedDate}</span>
                        {job.isNew && (
                          <Badge className="bg-green-500">New</Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" className="whitespace-nowrap">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}