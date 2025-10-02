
import React, { useEffect, useCallback, useState } from 'react'
import { useForm } from '../../../context/FormContext'
import Select from '../../../components/Select'
import { useLanguage } from '../../../context/LanguageContext'

const StepJob = ({ checkValidStep, setValidMessage }) => {
    const { state, dispatch } = useForm()
    const { t } = useLanguage()
    
    // State to track individual field errors
    const [fieldErrors, setFieldErrors] = useState({})
    // State to track which fields have been interacted with (touched)
    const [touchedFields, setTouchedFields] = useState({})
    // State to track if validation has been triggered (e.g., by clicking next)
    const [validationTriggered, setValidationTriggered] = useState(false)

    // Predefined job options
    const jobOptions = [
        { value: 'software_engineer', label: 'Software Engineer' },
        { value: 'frontend_developer', label: 'Frontend Developer' },
        { value: 'backend_developer', label: 'Backend Developer' },
        { value: 'fullstack_developer', label: 'Full Stack Developer' },
        { value: 'ui_ux_designer', label: 'UI/UX Designer' },
        { value: 'product_manager', label: 'Product Manager' },
        { value: 'data_analyst', label: 'Data Analyst' },
        { value: 'devops_engineer', label: 'DevOps Engineer' },
        { value: 'qa_engineer', label: 'QA Engineer' },
        { value: 'mobile_developer', label: 'Mobile Developer' },
        { value: 'marketing_specialist', label: 'Marketing Specialist' },
        { value: 'sales_representative', label: 'Sales Representative' },
        { value: 'hr_specialist', label: 'HR Specialist' },
        { value: 'accountant', label: 'Accountant' },
        { value: 'customer_support', label: 'Customer Support' }
    ]

    // Handle field blur events (when user leaves the field)
    const handleFieldBlur = (field) => {
        // Mark field as touched
        setTouchedFields(prev => ({ ...prev, [field]: true }))
        
        // Validate this specific field if it has been touched
        validateSingleField(field)
    }

    // Validate a single field
    const validateSingleField = (field) => {
        let error = null

        switch (field) {
            case 'jobTitle':
                if (!state.appliedJob.jobTitle || state.appliedJob.jobTitle.trim() === '') {
                    error = t('error-job-title-required')
                }
                break
        }

        if (error) {
            setFieldErrors(prev => ({ ...prev, [field]: error }))
        } else {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const validateStep = useCallback(() => {
        // Mark validation as triggered (when next button is clicked)
        setValidationTriggered(true)
        
        const errors = {}
        
        if (!state.appliedJob.jobTitle || state.appliedJob.jobTitle.trim() === '') {
            errors.jobTitle = t('error-job-title-required')
        }
        
        // Update field errors state
        setFieldErrors(errors)
        
        // Set general validation message for parent component
        const hasErrors = Object.keys(errors).length > 0
        if (hasErrors) {
            setValidMessage(t('error-please-fix-errors'))
        } else {
            setValidMessage('')
        }

        return !hasErrors
    }, [state.appliedJob.jobTitle, setValidMessage, t])

    // Set the validation function in the parent component
    useEffect(() => {
        checkValidStep(() => validateStep)
    }, [checkValidStep, validateStep])
    
    // Don't validate automatically on form data changes - only validate when triggered

    const handleJobChange = (e) => {
        const selectedJob = e.target.value
        
        // Clear the error for this field when user starts selecting
        if (fieldErrors.jobTitle) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.jobTitle
                return newErrors
            })
        }
        
        dispatch({
            type: 'update_applied_job',
            payload: { jobTitle: selectedJob }
        })
    }

    return (
        <div className="w-full bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-shadow hover:shadow-xl">
            {/* Form Content */}
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">    

                <div className="text-center mb-4 sm:mb-6 md:mb-8">  
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 rtl-text leading-tight">
                        {t('job-application')}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg rtl-text leading-relaxed">
                        {t('job-application-subtitle')}
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <Select
                        label={t('position-applied-for')}
                        value={state.appliedJob.jobTitle}
                        onChange={handleJobChange}
                        onBlur={() => handleFieldBlur('jobTitle')}
                        options={jobOptions}
                        required={true}
                        error={(touchedFields.jobTitle || validationTriggered) ? fieldErrors.jobTitle : null}
                    />
                </div>

                {state.appliedJob.jobTitle && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-2 rtl-text">{t('selected-position')}</h3>
                        <p className="text-blue-700 rtl-text">
                            {jobOptions.find(job => job.value === state.appliedJob.jobTitle)?.label}
                        </p>
                    </div>
                )}

            </div>

        </div>
    )
}

export default StepJob
