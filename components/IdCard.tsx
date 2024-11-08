"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const IdCard = ({
  name,
  age,
  height,
  weight,
  weight_pounds,
  isLabMember,
  body_temperature,
  body_temperature_fahrenheit,
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Card className="w-[300px] h-[450px] bg-zinc-900/90 backdrop-blur-sm">
      <CardHeader className="flex items-center space-x-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          <Avatar className="w-20 h-20 border-2 border-zinc-500">
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center space-x-2"
        >
          <p className="text-2xl font-bold">{name}</p>
          <Badge className="bg-green-500">
            {isLabMember ? "Lab Member" : "Non-Member"}
          </Badge>
        </motion.div>
      </CardHeader>
      <CardContent className="p-6 grid gap-6">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl"
        >
          <strong>Age:</strong> {age} years
        </motion.p>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xl"
        >
          <strong>Height:</strong> {height} m
        </motion.p>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-xl"
        >
          <strong>Weight:</strong> {weight} kg{" "}
          {weight_pounds && `(${weight_pounds} lbs)`}
        </motion.p>
        {body_temperature && (
          <motion.p
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-xl"
          >
            <strong>Body Temperature:</strong> {body_temperature}°C{" "}
            {body_temperature_fahrenheit &&
              `(${body_temperature_fahrenheit.toFixed(2)}°F)`}
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
};

export default IdCard;
