import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {SCRREN_WIDTH} from '../helpers/screenHelpers';
import {ItemsEntity} from '../services/types';
import Badge from './Badge';
import {Caption, Title} from './Text';
import SilverBadge from '../img/silverBadge.png';
import BronzeBadge from '../img/bronzeBadge.png';
import GoldBadge from '../img/goldBadge.png';
import {useColors} from './common/Colors/ColorsProvider';

export default ({user}: {user: ItemsEntity}) => {
  const {colors} = useColors();

  const renderBadges = () => {
    return (
      <View style={styles.flexRow}>
        <Badge badgeCount={user.badge_counts.bronze} image={BronzeBadge} />
        <Badge badgeCount={user.badge_counts.silver} image={SilverBadge} />
        <Badge badgeCount={user.badge_counts.gold} image={GoldBadge} />
      </View>
    );
  };

  return (
    <View style={[styles.card]}>
      <View style={styles.flexRow}>
        <Image
          style={styles.img}
          resizeMode={'contain'}
          source={{uri: user.profile_image}}
        />
        <View style={{marginHorizontal: 20}}>
          <Title style={{color: colors.MAIN}}>{user.display_name}</Title>
          <Caption>{`Reputation: ${user.reputation}`}</Caption>
          <Caption>{`Accept rate: ${user.accept_rate}`}</Caption>
          <Caption style={{color: colors.GRAY}}>{user.location}</Caption>
          {renderBadges()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    width: SCRREN_WIDTH * 0.87,
  },
  flexRow: {
    flexDirection: 'row',
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
