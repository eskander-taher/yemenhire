"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { jobsApi, tendersApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Briefcase, FileText } from "lucide-react"

interface AdvertiseFormProps {
  locale: string
  dict: any
}

export function AdvertiseForm({ locale, dict }: AdvertiseFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("job")

  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    organization: "",
    location: "",
    salary: "",
    category: "",
    deadline: "",
    contactEmail: "",
    instructions: "",
    documents: [] as string[],
  })

  const [tenderForm, setTenderForm] = useState({
    title: "",
    description: "",
    organization: "",
    location: "",
    budget: "",
    category: "",
    deadline: "",
    contactEmail: "",
    instructions: "",
    documents: [] as string[],
  })

  const jobMutation = useMutation({
    mutationFn: (data: any) => jobsApi.createJob(data),
    onSuccess: (response) => {
      // Show success message with approval notice
      alert('Job submitted successfully! Your submission is now pending admin approval. You will be notified once it is reviewed.')
      router.push(`/${locale}/thank-you?type=job`)
    },
    onError: (error: any) => {
      console.error('Job posting failed:', error)
      // TODO: Show user-friendly error message
      alert('Job posting failed. Please contact support or try again later.')
    },
  })

  const tenderMutation = useMutation({
    mutationFn: (data: any) => tendersApi.createTender(data),
    onSuccess: (response) => {
      // Show success message with approval notice
      alert('Tender submitted successfully! Your submission is now pending admin approval. You will be notified once it is reviewed.')
      router.push(`/${locale}/thank-you?type=tender`)
    },
    onError: (error: any) => {
      console.error('Tender posting failed:', error)
      // TODO: Show user-friendly error message
      alert('Tender posting failed. Please contact support or try again later.')
    },
  })

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...jobForm,
      deadline: jobForm.deadline ? new Date(jobForm.deadline).toISOString() : undefined,
    }
    jobMutation.mutate(submitData)
  }

  const handleTenderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...tenderForm,
      deadline: tenderForm.deadline ? new Date(tenderForm.deadline).toISOString() : undefined,
    }
    tenderMutation.mutate(submitData)
  }

  const categories = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Marketing",
    "Engineering",
    "Construction",
    "Consulting",
    "Transportation",
    "Other",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{dict.advertise.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="job" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Briefcase className="w-4 h-4" />
              <span>{dict.advertise.jobTab}</span>
            </TabsTrigger>
            <TabsTrigger value="tender" className="flex items-center space-x-2 rtl:space-x-reverse">
              <FileText className="w-4 h-4" />
              <span>{dict.advertise.tenderTab}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="job">
            <form onSubmit={handleJobSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="job-title">{dict.advertise.form.title}</Label>
                  <Input
                    id="job-title"
                    placeholder={dict.advertise.form.titlePlaceholder}
                    value={jobForm.title}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="job-organization">{dict.advertise.form.company}</Label>
                  <Input
                    id="job-organization"
                    placeholder={dict.advertise.form.companyPlaceholder}
                    value={jobForm.organization}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, organization: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="job-location">{dict.advertise.form.location}</Label>
                  <Input
                    id="job-location"
                    placeholder={dict.advertise.form.locationPlaceholder}
                    value={jobForm.location}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="job-salary">{dict.advertise.form.salary}</Label>
                  <Input
                    id="job-salary"
                    placeholder={dict.advertise.form.salaryPlaceholder}
                    value={jobForm.salary}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, salary: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="job-category">Category</Label>
                  <Select
                    value={jobForm.category}
                    onValueChange={(value) => setJobForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="job-deadline">{dict.advertise.form.deadline}</Label>
                  <Input
                    id="job-deadline"
                    type="date"
                    value={jobForm.deadline}
                    onChange={(e) => setJobForm((prev) => ({ ...prev, deadline: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="job-description">{dict.advertise.form.description}</Label>
                <Textarea
                  id="job-description"
                  placeholder={dict.advertise.form.descriptionPlaceholder}
                  value={jobForm.description}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="job-instructions">Application Instructions</Label>
                <Textarea
                  id="job-instructions"
                  placeholder="Provide specific instructions for applicants..."
                  value={jobForm.instructions}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, instructions: e.target.value }))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="job-contact">{dict.advertise.form.contact}</Label>
                <Input
                  id="job-contact"
                  type="email"
                  placeholder="contact@company.com"
                  value={jobForm.contactEmail}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={jobMutation.isPending}>
                {jobMutation.isPending ? dict.advertise.form.submitting : dict.advertise.form.submit}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="tender">
            <form onSubmit={handleTenderSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="tender-title">{dict.advertise.form.title}</Label>
                  <Input
                    id="tender-title"
                    placeholder={dict.advertise.form.titlePlaceholder}
                    value={tenderForm.title}
                    onChange={(e) => setTenderForm((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tender-organization">{dict.advertise.form.company}</Label>
                  <Input
                    id="tender-organization"
                    placeholder={dict.advertise.form.companyPlaceholder}
                    value={tenderForm.organization}
                    onChange={(e) => setTenderForm((prev) => ({ ...prev, organization: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tender-location">{dict.advertise.form.location}</Label>
                  <Input
                    id="tender-location"
                    placeholder={dict.advertise.form.locationPlaceholder}
                    value={tenderForm.location}
                    onChange={(e) => setTenderForm((prev) => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tender-budget">{dict.advertise.form.budget}</Label>
                  <Input
                    id="tender-budget"
                    placeholder={dict.advertise.form.budgetPlaceholder}
                    value={tenderForm.budget}
                    onChange={(e) => setTenderForm((prev) => ({ ...prev, budget: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="tender-category">Category</Label>
                  <Select
                    value={tenderForm.category}
                    onValueChange={(value) => setTenderForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tender-deadline">{dict.advertise.form.deadline}</Label>
                  <Input
                    id="tender-deadline"
                    type="date"
                    value={tenderForm.deadline}
                    onChange={(e) => setTenderForm((prev) => ({ ...prev, deadline: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tender-description">{dict.advertise.form.description}</Label>
                <Textarea
                  id="tender-description"
                  placeholder={dict.advertise.form.descriptionPlaceholder}
                  value={tenderForm.description}
                  onChange={(e) => setTenderForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  required
                />
              </div>

              <div>
                <Label htmlFor="tender-instructions">Submission Instructions</Label>
                <Textarea
                  id="tender-instructions"
                  placeholder="Provide specific instructions for tender submissions..."
                  value={tenderForm.instructions}
                  onChange={(e) => setTenderForm((prev) => ({ ...prev, instructions: e.target.value }))}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="tender-contact">{dict.advertise.form.contact}</Label>
                <Input
                  id="tender-contact"
                  type="email"
                  placeholder="procurement@organization.com"
                  value={tenderForm.contactEmail}
                  onChange={(e) => setTenderForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={tenderMutation.isPending}>
                {tenderMutation.isPending ? dict.advertise.form.submitting : dict.advertise.form.submit}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
