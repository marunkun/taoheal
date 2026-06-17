import Link from 'next/link';

export default function RootPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="text-center">
        <div className="text-6xl mb-8">🌿</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">DaoHeal</h1>
        <p className="text-xl text-gray-600 mb-8">Select your language / 选择语言</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/zh"
            className="px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
          >
            中文
          </Link>
          <Link
            href="/en"
            className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors font-semibold"
          >
            English
          </Link>
        </div>
      </div>
    </div>
  );
}
