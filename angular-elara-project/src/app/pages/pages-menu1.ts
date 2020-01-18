import {NbMenuItem} from "@nebular/theme";

export const MENU_ITEMS1: NbMenuItem[] = [{
    title: 'My Wallet',
    icon: 'home',
    link: '/pages/member-dashboard',
    home: true,
},
    {
        title: 'MAIN MENU',
        group: true,
    },
    {
        title: 'Earn Points',
        icon: 'layout-outline',
        link: '/pages/member-earn-points',
    },
    {
        title: 'Redeem Points',
        icon: 'edit-2-outline',
        link: '/pages/member-redeem-points',
    },
    {
        title: 'Transactions',
        icon: 'keypad-outline',
        link: '/pages/member-transactions',
    },
    {
        title: 'Exchange Tokens',
        icon: 'browser-outline',
        link: '/pages/member-exchange-tokens',
        
    },

 

];
