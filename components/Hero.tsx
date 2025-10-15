'use client';

import SplitHeader from '@/components/ui/SplitHeader';

export default function Hero({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <SplitHeader src="/assets/mirador-san-nicolas.jpg">
                <div className='h-[750px]'>
                    {/* BLank space */}
                </div>
                {children}
            </SplitHeader>
        </>
    );
}
