import { factory } from 'testing/util/data';

import { newAddress } from './address';
import { newArticle } from './article';
import { newCategory } from './category';
import { newChatMessage } from './chatMessage';
import { newComment } from './comment';
import { newCommentRating } from './commentRating';
import { newContentRating } from './contentRating';
import { newGroup } from './group';
import { newImage, newAvatarImage, newLogoImage } from './image';
import { newImpulse } from './impulse';
import { newMembership } from './membership';
import { newMembershipInvite } from './membershipInvite';
import { newMembershipRequest } from './membershipRequest';
import { newOnlineAccount } from './onlineAccount';
import { newPerson } from './person';
import { newRole } from './role';
import { newTask } from './task';
import { newTopic } from './topic';

export const address = newAddress();
export const addresses = factory(newAddress);

export const article = newArticle();
export const articles = factory(newArticle);

export const category = newCategory();
export const categories = factory(newCategory);

export const chatMessage = newChatMessage();
export const chatMessages = factory(newChatMessage);

export const comment = newComment();
export const comments = factory(newComment);

export const commentRating = newCommentRating();
export const commentRatings = factory(newCommentRating);

export const contentRating = newContentRating();
export const contentRatings = factory(newContentRating);

export const group = newGroup();
export const groups = factory(newGroup);

export const image = newImage();
export const images = factory(newImage);

export const impulse = newImpulse();
export const impulses = factory(newImpulse);

export const membership = newMembership();
export const memberships = factory(newMembership);

export const membershipInvite = newMembershipInvite();
export const membershipInvites = factory(newMembershipInvite);

export const membershipRequest = newMembershipRequest();
export const membershipRequests = factory(newMembershipRequest);

export const onlineAccount = newOnlineAccount();
export const onlineAccounts = factory(newOnlineAccount);

export const person = newPerson();
export const persons = factory(newPerson);

export const role = newRole();
export const roles = factory(newRole);

export const task = newTask();
export const tasks = factory(newTask);

export const topic = newTopic();
export const topics = factory(newTopic);

export {
  newAddress,
  newArticle,
  newCategory,
  newChatMessage,
  newComment,
  newCommentRating,
  newContentRating,
  newGroup,
  newImage,
  newAvatarImage,
  newLogoImage,
  newImpulse,
  newMembership,
  newMembershipInvite,
  newMembershipRequest,
  newOnlineAccount,
  newPerson,
  newRole,
  newTask,
  newTopic,
};
