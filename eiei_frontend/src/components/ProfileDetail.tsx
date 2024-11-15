import React from "react";

interface ProfileDetailProps {
  label: string;
  value: string | number;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2">
    <span className="font-medium text-sm sm:text-base">{label}:</span>
    <span className="text-sm sm:text-base mt-1 sm:mt-0">{value}</span>
  </div>
);

export default ProfileDetail;
