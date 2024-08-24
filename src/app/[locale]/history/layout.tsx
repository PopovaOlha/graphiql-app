import SecondaryLayout from '@/components/SecondaryLayout/SecondaryLayout';

export default function PagesLayout({ children }: { children: React.ReactNode }) {
    return <SecondaryLayout>{children}</SecondaryLayout>;
}
