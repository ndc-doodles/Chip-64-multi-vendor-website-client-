import HeaderLayout from "@/Layout/Header/HeaderLayout";
import BannerSection from "@/Layout/Banner/HomeBanner";
import FeaturedCategories from "@/Layout/Categories/FeaturedCategoriesLayout";
import FeaturedProducts from "@/Layout/Products/FeaturedProductLayout";
import CraftsmanshipSection from "@/Layout/Banner/CraftmanshipSection";
import NewsletterBanner from "@/Layout/Banner/NewsLetterBanner";
import Footer from "@/Layout/Footer/FooterLayout";
import { VendorCards } from "@/Layout/Banner/VendorCardBannerLayout";
import HomeCollections from "@/Layout/Banner/AdBanner";
import PortfolioBanner from "@/Components/Banner/NewBanner";
import SearchBar from "@/Components/SearchBar/SearchBar";
import ChipTrustSection from "@/Layout/Banner/TrustSectionBanner";
import RecentlyViewedSection from "@/Layout/Section/RecentlyViewedSection";
import ProductHero from "@/Components/Banner/SmallBanner";
import Newsletter from "@/Components/NewsLetter/NewsLetter";
export default function HomePage(){
    return (
        <main className="min-h-screen bg-background"> 
        <HeaderLayout/>
       
        <PortfolioBanner/>
        <FeaturedCategories/>
        
        <FeaturedProducts/>
                <RecentlyViewedSection/>
        <ChipTrustSection/>

        <CraftsmanshipSection/> 
        <Newsletter/>
        <Footer/>
        </main>
    )
}