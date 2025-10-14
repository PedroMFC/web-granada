'use client';

import SplitHeader from '@/components/ui/SplitHeader';

export default function Hero({ children }: { children?: React.ReactNode }) {
    return (
        <SplitHeader src="/assets/mirador-san-nicolas.jpg">
            {children}
        </SplitHeader>
    );
}
