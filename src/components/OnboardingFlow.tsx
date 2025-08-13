import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Download, CheckCircle } from 'lucide-react';
import FinoraLogo from '@/components/FinoraLogo';
import financeIcons from '@/assets/finance-icons.png';

interface FormData {
  // Business Information
  companyName: string;
  businessType: string;
  industry: string;
  yearsInBusiness: string;
  companySize: string;
  
  // Contact Details
  contactName: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  
  // Financial Data & Tools
  annualRevenue: string;
  currentFinancialTools: string[];
  accountingMethod: string;
  
  // Business Goals & Requirements
  primaryGoals: string[];
  growthChallenges: string;
  
  // Access & Additional Notes
  additionalNotes: string;
}

const initialFormData: FormData = {
  companyName: '',
  businessType: '',
  industry: '',
  yearsInBusiness: '',
  companySize: '',
  contactName: '',
  position: '',
  email: '',
  phone: '',
  address: '',
  annualRevenue: '',
  currentFinancialTools: [],
  accountingMethod: '',
  primaryGoals: [],
  growthChallenges: '',
  additionalNotes: ''
};

const OnboardingFlow = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isComplete, setIsComplete] = useState(false);

  const sections = [
    'Business Information',
    'Contact Details', 
    'Financial Data & Tools',
    'Business Goals & Requirements',
    'Access & Additional Notes'
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('finora-onboarding');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('finora-onboarding', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultipleChoice = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof FormData] as string[]), value]
        : (prev[field as keyof FormData] as string[]).filter(item => item !== value)
    }));
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setIsComplete(true);
      // Clear saved data on completion
      localStorage.removeItem('finora-onboarding');
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const downloadPDF = () => {
    // Simplified PDF download - in real implementation, use jsPDF or similar
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'finora-onboarding-responses.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen motion-gradient flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-md mx-auto"
        >
          <Card className="p-8 shadow-elegant bg-card/95 backdrop-blur">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="mb-6"
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            </motion.div>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl font-bold text-primary mb-2"
            >
              Thank You!
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-foreground/80 mb-6"
            >
              Your onboarding details have been submitted successfully.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Button 
                onClick={downloadPDF}
                className="bg-gradient-accent hover:opacity-90 shadow-button"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Your Responses
              </Button>
            </motion.div>
          </Card>
        </motion.div>
        
        {/* Floating icons */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <img 
            src={financeIcons} 
            alt=""
            className="absolute top-1/4 left-1/4 w-20 h-20 opacity-10 float-animation"
          />
          <img 
            src={financeIcons} 
            alt=""
            className="absolute top-3/4 right-1/4 w-16 h-16 opacity-10 float-animation"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen motion-gradient">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FinoraLogo />
              <div>
                <p className="text-sm font-medium text-foreground/60">
                  Smarter Decisions. Stronger Growth.
                </p>
              </div>
            </div>
            <div className="text-sm font-medium text-primary">
              {currentSection + 1} of {sections.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-surface-muted rounded-full h-2 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-accent progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-elegant bg-card/95 backdrop-blur">
          <div className="p-8">
            <motion.div
              key={currentSection}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold text-primary mb-6">
                {sections[currentSection]}
              </h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="space-y-6"
                >
                  {currentSection === 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => updateFormData('companyName', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type *</Label>
                        <Select value={formData.businessType} onValueChange={(value) => updateFormData('businessType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="llc">LLC</SelectItem>
                            <SelectItem value="corporation">Corporation</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry *</Label>
                        <Input
                          id="industry"
                          value={formData.industry}
                          onChange={(e) => updateFormData('industry', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Years in Business *</Label>
                        <RadioGroup 
                          value={formData.yearsInBusiness} 
                          onValueChange={(value) => updateFormData('yearsInBusiness', value)}
                          className="flex flex-wrap gap-4"
                        >
                          {['0-1 years', '2-5 years', '6-10 years', '10+ years'].map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={option} />
                              <Label htmlFor={option} className="text-sm">{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label>Company Size *</Label>
                        <RadioGroup 
                          value={formData.companySize} 
                          onValueChange={(value) => updateFormData('companySize', value)}
                          className="flex flex-wrap gap-6"
                        >
                          {['1-10 employees', '11-50 employees', '51-200 employees', '200+ employees'].map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={option} />
                              <Label htmlFor={option} className="text-sm">{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {currentSection === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          value={formData.contactName}
                          onChange={(e) => updateFormData('contactName', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Position/Title *</Label>
                        <Input
                          id="position"
                          value={formData.position}
                          onChange={(e) => updateFormData('position', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Business Address</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => updateFormData('address', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {currentSection === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Annual Revenue Range *</Label>
                        <RadioGroup 
                          value={formData.annualRevenue} 
                          onValueChange={(value) => updateFormData('annualRevenue', value)}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {['Under $100K', '$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M+'].map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={option} />
                              <Label htmlFor={option} className="text-sm">{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Current Financial Tools (Select all that apply)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {['QuickBooks', 'Xero', 'Excel/Spreadsheets', 'FreshBooks', 'Sage', 'Other'].map((tool) => (
                            <div key={tool} className="flex items-center space-x-2">
                              <Checkbox
                                id={tool}
                                checked={formData.currentFinancialTools.includes(tool)}
                                onCheckedChange={(checked) => handleMultipleChoice('currentFinancialTools', tool, checked as boolean)}
                              />
                              <Label htmlFor={tool} className="text-sm">{tool}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Accounting Method *</Label>
                        <RadioGroup 
                          value={formData.accountingMethod} 
                          onValueChange={(value) => updateFormData('accountingMethod', value)}
                          className="flex flex-wrap gap-6"
                        >
                          {['Cash Basis', 'Accrual Basis', 'Modified Cash', 'Not Sure'].map((method) => (
                            <div key={method} className="flex items-center space-x-2">
                              <RadioGroupItem value={method} id={method} />
                              <Label htmlFor={method} className="text-sm">{method}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  )}

                  {currentSection === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>Primary Business Goals (Select all that apply)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            'Improve Cash Flow Management',
                            'Better Financial Reporting',
                            'Automate Accounting Processes',
                            'Scale Business Operations',
                            'Reduce Manual Work',
                            'Better Decision Making'
                          ].map((goal) => (
                            <div key={goal} className="flex items-center space-x-2">
                              <Checkbox
                                id={goal}
                                checked={formData.primaryGoals.includes(goal)}
                                onCheckedChange={(checked) => handleMultipleChoice('primaryGoals', goal, checked as boolean)}
                              />
                              <Label htmlFor={goal} className="text-sm">{goal}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="growthChallenges">What are your biggest growth challenges?</Label>
                        <Textarea
                          id="growthChallenges"
                          value={formData.growthChallenges}
                          onChange={(e) => updateFormData('growthChallenges', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                          rows={4}
                          placeholder="Describe your main challenges in growing your business..."
                        />
                      </div>
                    </div>
                  )}

                  {currentSection === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="additionalNotes">Additional Notes or Requirements</Label>
                        <Textarea
                          id="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                          className="transition-smooth hover:border-accent/50 focus:border-accent"
                          rows={6}
                          placeholder="Please share any additional information, specific requirements, or questions you have about working with Finora..."
                        />
                      </div>
                      
                      <div className="bg-surface p-4 rounded-lg border border-border/50">
                        <h3 className="font-semibold text-primary mb-2">What happens next?</h3>
                        <ul className="text-sm text-foreground/80 space-y-1">
                          <li>• Our team will review your responses within 24 hours</li>
                          <li>• We'll schedule a discovery call to discuss your needs</li>
                          <li>• You'll receive a customized proposal for your business</li>
                          <li>• We'll help you get started with a smooth onboarding process</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/50">
              <Button
                variant="outline"
                onClick={prevSection}
                disabled={currentSection === 0}
                className="transition-smooth hover:border-accent hover:text-accent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={nextSection}
                className="bg-gradient-primary hover:opacity-90 shadow-button transition-smooth"
              >
                {currentSection === sections.length - 1 ? 'Complete' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </main>

      {/* Floating background icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.img 
          src={financeIcons} 
          alt=""
          className="absolute top-1/4 left-10 w-16 h-16 opacity-5"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img 
          src={financeIcons} 
          alt=""
          className="absolute top-1/2 right-10 w-20 h-20 opacity-5"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.img 
          src={financeIcons} 
          alt=""
          className="absolute bottom-1/4 left-1/3 w-14 h-14 opacity-5"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>
    </div>
  );
};

export default OnboardingFlow;