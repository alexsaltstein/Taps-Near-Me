import bug from '../../../assets/settings/bug.png';
import suggestion from '../../../assets/settings/suggestion.png';
import help from '../../../assets/settings/help.png';
import privacy from '../../../assets/settings/privacy.png';
import terms from '../../../assets/settings/terms.png';
import review from '../../../assets/settings/review.png';
import instagram from '../../../assets/settings/instagram.png';
import twitter from '../../../assets/settings/twitter.png';


const SECTIONS = {
  Support: [
    {
      label: 'I found a bug!',
      icon: bug,
      onPress: () => { }
    },
    {
      label: 'I have a suggestion',
      icon: suggestion,
      onPress: () => { }
    },
    {
      label: 'I need help',
      icon: help,
      onPress: () => { }
    },
  ],
  Legal: [
    {
      label: 'Privacy Policy',
      icon: privacy,
      onPress: () => { }
    },
    {
      label: 'Terms of Service',
      icon: terms,
      onPress: () => { }
    },
  ],
  Social: [
    {
      label: 'Leave a review',
      icon: review,
      onPress: () => { }
    },
    {
      label: 'Follow us on Instagram',
      icon: instagram,
      onPress: () => { }
    },
    {
      label: 'Follow us on Twitter',
      icon: twitter,
      onPress: () => { }
    },
  ],
}

export { SECTIONS }