// MemberAvatar.js
import React from 'react';

function renderMemberAvatar(member) {
    if (member.image) {
        return <img src={member.image} alt="User Avatar" />;
    } else {
        return <div className="member-avatar">{member.name.charAt(0)}</div>;
    }
}

export default renderMemberAvatar;
