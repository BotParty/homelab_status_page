import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {firstName}!
      </h1>
      <img src="https://github.com/adnanwahab/homelab/blob/main/web/public/personal/friends.jpg?raw=true" alt="Michael Pollan" className="w-1/2 mx-auto" />
      <img src="https://github.com/adnanwahab/homelab/blob/main/web/public/personal/1320.jpeg?raw=true" alt="Michael Pollan" className="w-1/2 mx-auto" />

      <p className="text-gray-600 leading-relaxed">
        This is a living blogpost that will updated daily for the next 70 years - https://reflect.site/g/awahab/legal/fddf4a0353d6408f80d4576d4ecb83b5

      </p>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          To assist adnan in helping rena, text 713-677-3669.
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">

        <h1>I believed rena is a good person.</h1>

<li>I helped her move.</li>

<li>I taught he r python.</li> 

<li>And i brought her to yoga classes every week.</li>

<li>She asked me if i thought we had a good future together. We were on good terms before the pandemic.</li>

<li>We live in a society where cute  girls like rena think they can get away with anything.</li>





<li></li>I thought rena kaufman was different. On our first date, she told me that she cared about Muhammad Yunus the inventor of micro-loans.
<li></li>Deep down i know rena was a good person. But i think the superficial culture of new york corrupted and tainted her heart.



<li></li>Rena made me happy for a long time. Probably the happiest i have ever felt. But now i gain happiness from something more real than temporary love. I gain happiness from improving the world.



    <li>And even though i couldn't improve rena's story. I'm glad we had a chapter.</li>
          <li>Complete your profile</li>
          <li>Explore our features</li>
          <li>Connect with others</li>
          <img src="https://camo.githubusercontent.com/d5a8cd8fc1aba49c12c6a3b36217f1eeb885fb95dac6ddf2c9933fd61475574e/68747470733a2f2f6f627365727661626c6568712e6f627365727661626c6568712e636c6f75642f6f73732d616e616c79746963732f406f627365727661626c6568712f6672616d65776f726b2f646f776e6c6f6164732d6461726b2e737667" />
        </ul>
      </div>

      <p className="text-sm text-gray-500 mt-8">
        If you have any questions, feel free to reach out to our support team.
      </p>
    </div>
  </div>
);