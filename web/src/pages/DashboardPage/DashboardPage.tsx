import React, { useState } from 'react';
import { Link, routes } from "@redwoodjs/router";
import { MetaTags, useQuery } from "@redwoodjs/web";
import Chat from 'src/components/Chat/Chat'
import { ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/20/solid'

import { CalendarIcon, CommandLineIcon, MegaphoneIcon } from '@heroicons/react/24/outline'
import GoalBigThreeCell from 'src/components/GoalBigThreeCell';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const DashboardPage = () => {


  const items = [
    {
      name: 'Goals',
      description: 'What are you trying to accomplish?',
      to: routes.goals(),
      iconColor: 'bg-pink-500',
      icon: MegaphoneIcon,
    },
    // {
    //   name: 'Results',
    //   description: 'Walk me through your plan to achieve your objective.',
    //   to: routes.results(),
    //   iconColor: 'bg-purple-500',
    //   icon: CommandLineIcon,
    // },
    // {
    //   name: 'Actions',
    //   description: 'Show me the team members that will help you achieve your objective.',
    //   to: routes.actions(),
    //   iconColor: 'bg-yellow-500',
    //   icon: CalendarIcon,
    // },
  ]
  

  return (
    
    <>
      <MetaTags title="Dashboard" description="Dashboard Page" />

      
      <div className="mx-auto max-w-6xl">

      <h2 className="className text-2xl md:text-4xl font-bold text-center mb-2">Empower Your Path to Excellence</h2>
      <p className="text-center text-gray-500 text-sm md:text-base mb-6">Platform that helps you achieve your goals and become the best version of yourself.</p>

      {/* <h2 className="text-base font-semibold leading-6 text-gray-900">Create your first project</h2>
      <p className="mt-1 text-sm text-gray-500">Get started by selecting a template or start from an empty project.</p> */}
      <ul role="list" className="mt-6 divide-y divide-gray-200 border-b border-t border-gray-200">
        {items.map((item, itemIdx) => (
          <li key={itemIdx}>
            <div className="group relative flex items-start space-x-3 py-4">
              <div className="flex-shrink-0">
                <span
                  className={classNames(item.iconColor, 'inline-flex h-10 w-10 items-center justify-center rounded-lg')}
                >
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">
                  <Link to={item.to}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.name}
                  </Link>
                  {/* <a href={item.href}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.name}
                  </a> */}
                </div>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <div className="flex-shrink-0 self-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* <div className="mt-6 flex">
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Or start from an empty project
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div> */}

      
    </div>
    </>
  );
};

export default DashboardPage;
