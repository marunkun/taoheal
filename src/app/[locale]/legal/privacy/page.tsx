export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        {isZh ? '隐私政策' : 'Privacy Policy'}
      </h1>

      <div className="prose max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">1. {isZh ? '信息收集' : 'Information Collection'}</h2>
          <p>{isZh ? '我们收集您自愿提供的信息，例如订阅邮件时提供的邮箱地址。我们不会在您浏览网站时收集个人身份信息。' : 'We collect information you voluntarily provide, such as email addresses when subscribing to our newsletter. We do not collect personally identifiable information when you browse our website.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">2. {isZh ? '信息使用' : 'Information Use'}</h2>
          <p>{isZh ? '我们收集的信息仅用于：提供您请求的服务、发送您订阅的更新内容、改进网站体验。' : 'Information we collect is used only for: providing services you request, sending updates you subscribe to, improving website experience.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">3. {isZh ? '信息保护' : 'Information Protection'}</h2>
          <p>{isZh ? '我们采取合理的安全措施保护您的个人信息，防止未经授权的访问、使用或泄露。' : 'We take reasonable security measures to protect your personal information from unauthorized access, use, or disclosure.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">4. {isZh ? 'Cookies使用' : 'Cookie Usage'}</h2>
          <p>{isZh ? '我们使用cookies来增强用户体验，分析网站流量。您可以选择禁用浏览器cookies，但这可能影响某些功能。' : 'We use cookies to enhance user experience and analyze website traffic. You can choose to disable browser cookies, but this may affect certain features.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">5. {isZh ? '第三方服务' : 'Third-Party Services'}</h2>
          <p>{isZh ? '我们可能使用第三方服务（如分析工具）来了解网站使用情况。这些服务有自己的隐私政策。' : 'We may use third-party services (such as analytics tools) to understand website usage. These services have their own privacy policies.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">6. {isZh ? '用户权利' : 'User Rights'}</h2>
          <p>{isZh ? '您有权访问、更正或删除您的个人信息。如有任何疑问，请联系我们。' : 'You have the right to access, correct, or delete your personal information. Please contact us if you have any questions.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">7. {isZh ? '儿童隐私' : 'Children\'s Privacy'}</h2>
          <p>{isZh ? '我们的网站不面向13岁以下的儿童，我们不会故意收集儿童的个人信息。' : 'Our website is not directed to children under 13, and we do not knowingly collect personal information from children.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">8. {isZh ? '政策变更' : 'Policy Changes'}</h2>
          <p>{isZh ? '我们可能会不时更新本隐私政策。任何更改将在本页面上公布。' : 'We may update this privacy policy from time to time. Any changes will be posted on this page.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">9. {isZh ? '联系我们' : 'Contact Us'}</h2>
          <p>{isZh ? '如对本隐私政策有任何疑问，请通过网站提供的联系方式与我们联系。' : 'If you have any questions about this privacy policy, please contact us through the contact information provided on the website.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">10. {isZh ? '数据保留' : 'Data Retention'}</h2>
          <p>{isZh ? '我们保留您的信息的时间仅限实现本政策所述目的所需。' : 'We retain your information only for as long as necessary to fulfill the purposes described in this policy.'}</p>
        </section>

        <section className="bg-green-50 p-4 rounded-lg">
          <p className="font-medium text-primary">{isZh ? '最后更新日期：2026年6月' : 'Last updated: June 2026'}</p>
        </section>
      </div>
    </div>
  );
}