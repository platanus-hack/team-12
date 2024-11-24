// pages/CoinCatcherPage.tsx

import CoinCatcherGame from "./_component/CoinCatcherGame";

export default function CoinCatcherPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-gray-100 relative">
      <h1 className="text-2xl font-bold pt-6 text-center">Atrapa Monedas</h1>
      <CoinCatcherGame />
    </div>
  );
}
