import React from 'react';
import styles from "@/style";
import Footer from "@/components/footer";

export default function Page() {
    return (
        <div className='bg-background w-full overflow-hidden'>
            <section className="flex flex-col items-center justify-center flex-grow py-50">
                <p className="text-5xl text-center text-primary">
                    Check back later for exciting resources!
                </p>
            </section>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}