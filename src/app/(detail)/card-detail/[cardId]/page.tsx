import CardDetailHeader from '@/features/card-detail/ui/cardDetailHeader';
import CardTabs from '@/features/card-detail/ui/cardTabs';

function Page() {
  return (
    <div className="flex h-full min-h-dvh w-full">
      <div className="relative mx-auto flex w-full max-w-[600px] flex-col items-center bg-gray-black">
        <CardDetailHeader />
        <CardTabs />
      </div>
    </div>
  );
}

export default Page;
