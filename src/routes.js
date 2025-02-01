import { createBrowserRouter } from "react-router";
import RegistrationPage from "./pages/registrationPage";
import EmailVerification from "./pages/emailVerify";
import SetupOrganization from "./pages/companyInfo";
import WebPagesScraperStatus from "./pages/scrapedInfo";
import ChatbotIntegration from "./pages/threeMainBtns";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <RegistrationPage/>,
        index: true
    },
    {
        path:'/verify-email',
        element: <EmailVerification/>
    },
    {
        path: '/setup-organization',
        element: <SetupOrganization/>
    },
    {
        path:'/scraped-page',
        element:<WebPagesScraperStatus/>
    },
    {
        path: '/chatbot-btns',
        element: <ChatbotIntegration/>
    }
])

export default routes