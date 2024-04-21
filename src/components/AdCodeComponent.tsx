'use client';
import React from 'react';
import {useRouter} from 'next/navigation';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AdCodeWithoutRouterProps {
    router?: AppRouterInstance
}

class AdCodeWithoutRouter extends React.Component<AdCodeWithoutRouterProps> {
    renderAds() {
        const w: any = window; // TODO: make this not anytype
        (w.adsbygoogle = w.adsbygoogle || []).push({});
    }

    componentDidMount() {
        this.renderAds();
    }

    componentDidUpdate(prevProps: any) {
        const p: any = this.props; // TODO: make this not anytype
        if (p.router.asPath !== prevProps.router.asPath) {
            this.renderAds();
        }
    }

    render() {
        return (
            <div className="container mx-auto text-center" aria-hidden={true}>
                <ins
                    className="adsbygoogle"
                    style={{display: 'block', width: '100%'}}
                    data-ad-client="ca-pub-1234567890"
                    data-ad-slot="123456"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>
                <script
                    dangerouslySetInnerHTML={{__html: '(window.adsbygoogle = window.adsbygoogle || []).push({});'}}></script>
            </div>
        );
    }
}

const AdCode = () => {
    const router = useRouter();
    return <AdCodeWithoutRouter router={router}/>;
};

export default AdCode;