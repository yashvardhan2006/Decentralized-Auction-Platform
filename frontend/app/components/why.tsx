"use client";
import React from 'react';
import ActionCard from './ActionCard';
import { ShoppingCart, Award, RefreshCw, Zap } from 'lucide-react';

const ActionsSection: React.FC = () => {
  return (
    <section className=" flex justify-center w-full py-16 relative overflow-hidden py-12 bg-gray-50 dark:bg-gray-900">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF5C00]/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A259FF]/10 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Decentralized?</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Experience the benefits of blockchain-powered auctions.
              </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ActionCard 
            icon={ShoppingCart}
            title="Lower Fees"
            description="Pay just 5% in platform fees, half of what traditional auction sites charge."

            color="orange"
            
          />
          <ActionCard 
            icon={Award}
            title="Enhanced Security"
            description="Smart contracts ensure secure transactions without relying on third-party intermediaries."
            actionText="View Rewards"
            color="purple"
           
          />
          <ActionCard 
            icon={RefreshCw}
            title="Full Transparency"
            description="All bids and transactions are recorded on the blockchain and publicly verifiable."
            actionText="Exchange Now"
            color="blue"
          />
          
        </div>
      </div>
    </section>
  );
};

export default ActionsSection;