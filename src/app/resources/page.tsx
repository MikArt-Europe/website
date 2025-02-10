import React from 'react';
import styles from "@/style";
import Footer from "@/components/footer";

export default function Page() {
    return (
        <div className='bg-background w-full overflow-hidden dark'>
            <h1 className="text-5xl text-center m-50">Coming soon</h1>

            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}