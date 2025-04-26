"use client"

import type React from "react"

import { UserPlus, Search, DollarSign, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <motion.h2
          className="text-3xl font-bold mb-2 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our auction platform is easy to use and secure. Here's how to get started.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={item}>
          <StepCard
            icon={<UserPlus className="h-8 w-8 text-white" />}
            title="Create Account"
            description="Sign up for free and complete your profile for a better experience."
            bgColor="bg-gradient-to-br from-[#ff6b2b] to-[#ff9259]"
          />
        </motion.div>

        <motion.div variants={item}>
          <StepCard
            icon={<Search className="h-8 w-8 text-white" />}
            title="Find Items"
            description="Browse categories or search for items you're interested in."
            bgColor="bg-gradient-to-br from-[#b44aff] to-[#cd8aff]"
          />
        </motion.div>

        <motion.div variants={item}>
          <StepCard
            icon={<DollarSign className="h-8 w-8 text-white" />}
            title="Place Bids"
            description="Set your maximum bid and let our system automatically bid for you."
            bgColor="bg-gradient-to-br from-[#006e5f] to-[#00a58f]"
          />
        </motion.div>

        <motion.div variants={item}>
          <StepCard
            icon={<Award className="h-8 w-8 text-white" />}
            title="Win & Receive"
            description="The winning bid secures your item. Payment is processed through our secure system."
            bgColor="bg-gradient-to-br from-[#2e0068] to-[#5c1ac5]"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

interface StepCardProps {
  icon: React.ReactNode
  title: string
  description: string
  bgColor: string
}

function StepCard({ icon, title, description, bgColor }: StepCardProps) {
  return (
    <div
      className={`${bgColor} p-6 rounded-2xl text-white h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
    >
      <div className="bg-white/20 p-3 rounded-full w-fit mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  )
}
