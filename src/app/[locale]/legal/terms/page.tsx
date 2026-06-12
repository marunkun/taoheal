export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {isZh ? '服务条款' : 'Terms of Service'}
      </h1>

      <div className="prose max-w-none text-text-secondary space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. {isZh ? '接受条款' : 'Acceptance of Terms'}</h2>
          <p>{isZh ? '通过访问和使用本网站，您同意接受本服务条款的约束。如果您不同意这些条款，请不要使用本网站。' : 'By accessing and using this website, you agree to be bound by these terms of service. If you do not agree to these terms, please do not use this website.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. {isZh ? '服务描述' : 'Description of Service'}</h2>
          <p>{isZh ? 'TaoHeal提供中医养生知识内容和健康信息浏览服务。我们保留随时修改或终止服务的权利。' : 'TaoHeal provides TCM wellness knowledge content and health information browsing services. We reserve the right to modify or terminate services at any time.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. {isZh ? '用户行为' : 'User Conduct'}</h2>
          <p>{isZh ? '您同意不会使用本网站进行任何违法活动，或以任何方式损害、禁用或干扰本网站的正常运行。' : 'You agree not to use this website for any illegal activities, or in any way that damages, disables, or interferes with the normal operation of this website.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. {isZh ? '知识产权' : 'Intellectual Property'}</h2>
          <p>{isZh ? '本网站的所有内容，包括文本、图形、标识和软件，均受版权法保护。未经授权，您不得复制、修改或分发这些内容。' : 'All content on this website, including text, graphics, logos, and software, is protected by copyright laws. You may not copy, modify, or distribute this content without authorization.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. {isZh ? '内容准确性' : 'Content Accuracy'}</h2>
          <p>{isZh ? '我们努力确保网站内容的准确性，但不对信息的完整性或及时性作出保证。用户应自行判断信息的适用性。' : 'We strive to ensure the accuracy of website content, but make no guarantee about the completeness or timeliness of the information. Users should judge the applicability of the information for themselves.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. {isZh ? '第三方内容' : 'Third-Party Content'}</h2>
          <p>{isZh ? '本网站可能包含指向第三方网站的链接。我们不对第三方网站的内容或可用性负责。' : 'This website may contain links to third-party websites. We are not responsible for the content or availability of third-party websites.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. {isZh ? '免责声明' : 'Disclaimer'}</h2>
          <p>{isZh ? '本网站按\"原样\"提供，不提供任何明示或暗示的保证。在法律允许的最大范围内，我们不承担任何责任。' : 'This website is provided "as is" without any express or implied warranties. To the fullest extent permitted by law, we are not liable for any damages.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. {isZh ? '责任限制' : 'Limitation of Liability'}</h2>
          <p>{isZh ? '在任何情况下，我们都不对因使用或无法使用本网站而产生的任何间接、特殊或后果性损害负责。' : 'In no event shall we be liable for any indirect, special, or consequential damages arising from the use or inability to use this website.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">9. {isZh ? '服务变更' : 'Service Changes'}</h2>
          <p>{isZh ? '我们保留随时修改或停止服务的权利，恕不另行通知。' : 'We reserve the right to modify or discontinue services at any time without prior notice.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">10. {isZh ? '终止使用' : 'Termination of Use'}</h2>
          <p>{isZh ? '我们可以在任何时候因任何原因终止您的访问权限，无需事先通知。' : 'We may terminate your access at any time for any reason without prior notice.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">11. {isZh ? '适用法律' : 'Applicable Law'}</h2>
          <p>{isZh ? '本服务条款受中华人民共和国法律管辖。因本条款引起的任何争议应在被告住所地有管辖权的法院解决。' : 'These terms of service are governed by the laws of the People\'s Republic of China. Any disputes arising from these terms shall be resolved in the courts with jurisdiction at the defendant\'s domicile.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">12. {isZh ? '条款修改' : 'Terms Modification'}</h2>
          <p>{isZh ? '我们保留随时修改本服务条款的权利。修改后的条款将在页面上公布，继续使用即表示接受修改后的条款。' : 'We reserve the right to modify these terms of service at any time. Modified terms will be posted on the page, and continued use constitutes acceptance of the modified terms.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">13. {isZh ? '可分割性' : 'Severability'}</h2>
          <p>{isZh ? '如果本条款的任何规定被认定为无效或不可执行，其余规定将继续有效。' : 'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and effective.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">14. {isZh ? '完整协议' : 'Entire Agreement'}</h2>
          <p>{isZh ? '本服务条款构成您与我们之间关于使用本网站的完整协议，并取代所有先前协议。' : 'These terms of service constitute the entire agreement between you and us regarding your use of this website and supersede all prior agreements.'}</p>
        </section>

        <section className="bg-blue-50 p-4 rounded-lg">
          <p className="font-medium text-blue-800">{isZh ? '最后更新日期：2026年6月' : 'Last updated: June 2026'}</p>
        </section>
      </div>
    </div>
  );
}