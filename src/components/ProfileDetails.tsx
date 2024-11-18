import React from "react";
import ProfileDetail from "./ProfileDetail";

interface ProfileDetailsProps {
  details: { label: string; value: string | number }[];
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ details }) => (
  <section className="profile-details mb-6 space-y-4 text-gray-700">
    {details.map((detail, index) => (
      <ProfileDetail key={index} label={detail.label} value={detail.value} />
    ))}
  </section>
);

export default ProfileDetails;
