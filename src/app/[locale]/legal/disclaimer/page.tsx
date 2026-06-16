export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        {isZh ? '免责声明' : 'Disclaimer'}
      </h1>

      <div className="prose max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">1. {isZh ? '信息仅供参考' : 'Information for Reference Only'}</h2>
          <p>{isZh ? '本网站提供的所有内容仅供一般信息目的，不构成医疗建议、诊断或治疗。我们不对信息的准确性、完整性或及时性作出任何明示或暗示的保证。' : 'All content on this website is provided for general information purposes only and does not constitute medical advice, diagnosis, or treatment. We make no express or implied warranties about the accuracy, completeness, or timeliness of the information.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">2. {isZh ? '非专业医疗建议' : 'Not Professional Medical Advice'}</h2>
          <p>{isZh ? '本网站内容不应被视为专业医疗建议。在开始任何新的健康方案、饮食调整或使用任何健康产品之前，请务必咨询合格的医疗专业人员。' : 'The content on this website should not be considered professional medical advice. Please be sure to consult with a qualified healthcare professional before starting any new health regimen, dietary changes, or using any health products.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">3. {isZh ? '个人差异' : 'Individual Differences'}</h2>
          <p>{isZh ? '每个人的身体状况都是独特的。本网站提及的任何方法或建议可能不适合所有人。我们不对因个人差异导致的不良后果承担责任。' : 'Every individual\'s body condition is unique. Any methods or suggestions mentioned on this website may not be suitable for everyone. We are not responsible for adverse consequences arising from individual differences.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">4. {isZh ? '第三方链接' : 'Third-Party Links'}</h2>
          <p>{isZh ? '本网站可能包含指向第三方网站的链接。我们对这些网站的内容、隐私做法或准确性不承担责任。' : 'This website may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of these websites.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">5. {isZh ? '健康状况变化' : 'Changes in Health Conditions'}</h2>
          <p>{isZh ? '如果您在实践本网站建议的任何健康方案时出现不良反应，请立即停止并寻求专业医疗帮助。' : 'If you experience any adverse reactions while practicing any health regimen suggested on this website, please stop immediately and seek professional medical help.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">6. {isZh ? '使用责任' : 'Usage Responsibility'}</h2>
          <p>{isZh ? '用户自行决定是否使用本网站的信息，并承担相应的风险和责任。' : 'Users decide for themselves whether to use the information on this website and bear the corresponding risks and responsibilities.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">7. {isZh ? '免责声明更新' : 'Disclaimer Updates'}</h2>
          <p>{isZh ? '我们保留随时修改本免责声明的权利。修改后的内容将在本页面公布。' : 'We reserve the right to modify this disclaimer at any time. Modified content will be posted on this page.'}</p>
        </section>

        <section className="bg-amber-50 p-4 rounded-lg">
          <p className="font-medium text-amber-800">{isZh ? '最后更新日期：2026年6月' : 'Last updated: June 2026'}</p>
        </section>
      </div>
    </div>
  );
}