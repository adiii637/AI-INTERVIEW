import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            if (response && response.interviewReport) {
                setReport(response.interviewReport)
                return response.interviewReport
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return null
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const response = await getInterviewReportById(interviewId)
            if (response && response.interviewReport) {
                setReport(response.interviewReport)
                return response.interviewReport
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return null
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const response = await getAllInterviewReports()
            if (response && response.interviewReports) {
                setReports(response.interviewReports)
                return response.interviewReports
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return []
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        try {
            const data = await generateResumePdf({ interviewReportId })
            if (data && data.html) {
                const printWindow = window.open("", "_blank")
                printWindow.document.write(data.html)
                printWindow.document.close()
                printWindow.focus()
                
                // Slight timeout to let layout paint before opening print dialog
                setTimeout(() => {
                    printWindow.print()
                    printWindow.close()
                }, 300)
            }
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}