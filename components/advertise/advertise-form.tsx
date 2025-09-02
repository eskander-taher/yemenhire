"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Briefcase, FileText, Upload, X } from "lucide-react"

interface AdvertiseFormProps {
  locale: string
  dict: any
}

export function AdvertiseForm({ locale, dict }: AdvertiseFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("job")

  // Direct axios configuration for Express server
  const API_BASE_URL = process.env.NODE_ENV === "development" 
    ? "http://localhost:5000/api" 
    : "https://api.yemenhires.com/api"

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
    documents: [] as File[],
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
    documents: [] as File[],
  })

  // Dynamic mutation that handles both jobs and tenders
  const submitMutation = useMutation({
    mutationFn: async ({ data, type }: { data: any; type: 'job' | 'tender' }) => {
      const endpoint = type === 'job' ? 'jobs' : 'tenders'
      
      // Create FormData for multipart/form-data (required by multer middleware)
      const formData = new FormData()
      
      // Add all fields to FormData
      Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
          if (key === 'documents' && Array.isArray(data[key])) {
            // Handle file documents array
            data[key].forEach((file: File) => {
              formData.append('documents', file)
            })
          } else if (Array.isArray(data[key])) {
            // Handle other arrays
            data[key].forEach((item: any) => {
              formData.append(key, item)
            })
          } else {
            formData.append(key, data[key])
          }
        }
      })
      
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 seconds timeout (increased from 10s)
      })
      return { data: response.data, type }
    },
    onSuccess: ({ data, type }) => {
      // Show success message with approval notice
      const message = type === 'job' 
        ? 'Job submitted successfully! Your submission is now pending admin approval. You will be notified once it is reviewed.'
        : 'Tender submitted successfully! Your submission is now pending admin approval. You will be notified once it is reviewed.'
      
      alert(message)
      router.push(`/${locale}/thank-you?type=${type}`)
    },
    onError: (error: any) => {
      console.error('Submission failed:', error)
      
      // Extract meaningful error message
      let errorMessage = 'Submission failed. Please contact support or try again later.'
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.response?.data?.errors) {
        errorMessage = `Validation failed: ${error.response.data.errors.join(', ')}`
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      
      alert(errorMessage)
    },
  })

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...jobForm,
      deadline: jobForm.deadline ? new Date(jobForm.deadline).toISOString() : undefined,
    }
    submitMutation.mutate({ data: submitData, type: 'job' })
  }

  const handleTenderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...tenderForm,
      deadline: tenderForm.deadline ? new Date(tenderForm.deadline).toISOString() : undefined,
    }
    submitMutation.mutate({ data: submitData, type: 'tender' })
  }

  // File handling functions
  const handleJobFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setJobForm(prev => ({ ...prev, documents: files }))
  }

  const handleTenderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setTenderForm(prev => ({ ...prev, documents: files }))
  }

  const removeJobFile = (index: number) => {
    setJobForm(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const removeTenderFile = (index: number) => {
    setTenderForm(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const categories = [
    { key: "technology", label: dict.advertise.form.categories.technology },
    { key: "healthcare", label: dict.advertise.form.categories.healthcare },
    { key: "education", label: dict.advertise.form.categories.education },
    { key: "finance", label: dict.advertise.form.categories.finance },
    { key: "marketing", label: dict.advertise.form.categories.marketing },
    { key: "engineering", label: dict.advertise.form.categories.engineering },
    { key: "construction", label: dict.advertise.form.categories.construction },
    { key: "consulting", label: dict.advertise.form.categories.consulting },
    { key: "transportation", label: dict.advertise.form.categories.transportation },
    { key: "other", label: dict.advertise.form.categories.other },
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
                  <Label htmlFor="job-category">{dict.advertise.form.category}</Label>
                  <Select
                    value={jobForm.category}
                    onValueChange={(value) => setJobForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={dict.advertise.form.categoryPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.key} value={category.key}>
                          {category.label}
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
                <Label htmlFor="job-instructions">{dict.advertise.form.instructions}</Label>
                <Textarea
                  id="job-instructions"
                  placeholder={dict.advertise.form.instructionsPlaceholder}
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
                  placeholder={dict.advertise.form.contactPlaceholder}
                  value={jobForm.contactEmail}
                  onChange={(e) => setJobForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="job-documents">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Documents (Optional)
                </Label>
                <Input
                  id="job-documents"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleJobFileChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload up to 5 files (PDF, DOC, DOCX, TXT, JPG, PNG). Max 5MB each.
                </p>
                
                {/* Display selected files */}
                {jobForm.documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {jobForm.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700 truncate">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeJobFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
                {submitMutation.isPending ? dict.advertise.form.submitting : dict.advertise.form.submit}
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
                  <Label htmlFor="tender-category">{dict.advertise.form.category}</Label>
                  <Select
                    value={tenderForm.category}
                    onValueChange={(value) => setTenderForm((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={dict.advertise.form.categoryPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.key} value={category.key}>
                          {category.label}
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
                <Label htmlFor="tender-instructions">{dict.advertise.form.submissionInstructions}</Label>
                <Textarea
                  id="tender-instructions"
                  placeholder={dict.advertise.form.submissionInstructionsPlaceholder}
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
                  placeholder={dict.advertise.form.contactPlaceholder}
                  value={tenderForm.contactEmail}
                  onChange={(e) => setTenderForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="tender-documents">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Documents (Optional)
                </Label>
                <Input
                  id="tender-documents"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={handleTenderFileChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload up to 5 files (PDF, DOC, DOCX, TXT, JPG, PNG). Max 5MB each.
                </p>
                
                {/* Display selected files */}
                {tenderForm.documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {tenderForm.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm text-gray-700 truncate">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTenderFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
                {submitMutation.isPending ? dict.advertise.form.submitting : dict.advertise.form.submit}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
