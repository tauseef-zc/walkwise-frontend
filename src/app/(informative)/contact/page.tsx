import ContactForm from '@/components/contact/ContactForm';
import ButtonPrimary from '@/components/shared/ButtonPrimary';
import Input from '@/components/shared/Input';
import Label from '@/components/shared/Label';
import Textarea from '@/components/shared/Textarea';
import React from 'react';

export interface PageContactProps {}

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "144, Temple Road, Maradana, Colombo 10, Western Province, Sri Lanka",
  },
  {
    title: "💌 EMAIL",
    desc: "tauseef.offl@gmail.com",
  },
  {
    title: "☎ PHONE",
    desc: "+94-77-969-0002",
  },
];

const Contact = () => {
  return (
    <div className="mb-24 lg:mb-32">
      <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
        Contact
      </h2>
      <div className="container max-w-7xl mx-auto">
        <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
          <div className="max-w-sm space-y-8">
            {info.map((item, index) => (
              <div key={index}>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  {item.title}
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
