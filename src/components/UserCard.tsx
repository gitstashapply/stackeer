import React from 'react';
import {View, Image, Text} from 'react-native';
import {SCRREN_WIDTH} from '../helpers/screenHelpers';
import {ItemsEntity} from '../services/types';
import Badge from './Badge';
import {Title} from './Text';
//@ts-ignore
import SilverBadge from '../silverBadge.png';
import BronzeBadge from '../bronzeBadge.png';
import GoldBadge from '../goldBadge.png';

export default ({user}: {user: ItemsEntity}) => {
  const renderBadges = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Badge badgeCount={user.badge_counts.bronze} image={BronzeBadge} />
        <Badge badgeCount={user.badge_counts.silver} image={SilverBadge} />
        <Badge badgeCount={user.badge_counts.gold} image={GoldBadge} />
      </View>
    );
  };

  return (
    <View style={{padding: 20, width: SCRREN_WIDTH * 0.87}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 100, width: 100, borderRadius: 50}}
          source={{uri: user.profile_image}}
        />
        <View style={{marginHorizontal: 20}}>
          <Title>{user.display_name}</Title>
          <Text>{user.location}</Text>
          <Text>{`Reputation: ${user.reputation}`}</Text>
          {renderBadges()}
        </View>
      </View>
    </View>
  );
};
