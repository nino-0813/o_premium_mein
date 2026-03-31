import Image from 'next/image';
import TableOfContents from '@/src/components/TableOfContents';
import Link from 'next/link';

type HeroImage = {
  src: string;
  alt: string;
  maxWidthClassName?: string; // e.g. "max-w-[420px]"
  aspectClassName?: string; // e.g. "aspect-[2/3]" | "aspect-[16/9]"
  sizes?: string;
  priority?: boolean;
};

export default function ColumnArticleLayout(props: {
  label?: string;
  title: string;
  lead?: string;
  heroImage?: HeroImage;
  children: React.ReactNode;
}) {
  const label = props.label ?? 'コラム';
  const heroImage = props.heroImage;

  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-20 sm:py-24 bg-brand-green-light/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-widest text-brand-green mb-3">{label}</p>
            <h1 className="font-serif text-2xl sm:text-4xl text-gray-900 leading-tight break-words sm:break-keep">
              {props.title}
            </h1>
            {props.lead ? <p className="text-gray-600 mt-4 leading-relaxed">{props.lead}</p> : null}

            {heroImage ? (
              <div className={`mt-8 sm:mt-10 w-full ${heroImage.maxWidthClassName ?? 'max-w-[520px]'} mx-auto`}>
                <div
                  className={`relative ${heroImage.aspectClassName ?? 'aspect-[2/3]'} w-full overflow-hidden rounded-2xl border border-brand-green/10 bg-white shadow-sm`}
                >
                  <Image
                    src={heroImage.src}
                    alt={heroImage.alt}
                    fill
                    priority={heroImage.priority ?? false}
                    className="object-contain p-3 sm:p-4"
                    sizes={heroImage.sizes ?? '(max-width: 640px) 90vw, 520px'}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <article className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <TableOfContents contentSelector=".js-article-content" />
        </div>
        <div className="js-article-content max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-headings:font-serif prose-a:text-brand-green">
          {props.children}
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
          <div className="rounded-2xl bg-brand-green-light/30 border border-brand-green/20 p-6 sm:p-8">
            <p className="text-gray-700 leading-relaxed">
              なかでも O PREMIUM は、現場の歯科衛生士が「もっと治療しやすく、患者様も快適に」という課題から開発した歯科専用タオルです。超甘撚り糸の極上の肌触りと、治療のしやすさを両立した穴（O）サイズが特徴で、まずは無料サンプルでその違いを体感いただけます。
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/sample"
                className="inline-flex items-center justify-center px-10 py-4 text-sm sm:text-base font-medium tracking-widest text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-sm shadow-md"
              >
                無料サンプルを請求する
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

