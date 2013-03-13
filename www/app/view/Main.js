Ext.define('Nooku.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome'
                },

                html: [
                    "<p>Awesome! You've just installed the Nooku mobile app.<p>",
                    "<p>What you're looking at right now is an app developed in <a target='_blank' href=\"http://www.sencha.com/products/touch\">Sencha Touch</a> and compiled using <a target='_blank' href=\"http://build.phonegap.com\">PhoneGap Build</a>.</p>",
                    "<p>This app offers one amazing feature, News. The News view is loading data through JSON from the frontpage of our <a target='_blank' href=\"http://demo.nooku.org\">demo website</a>.</p>",
                    "<p>The source code can be found at: <a target='_blank' href=\"http://www.github.com/nooku/nooku-mobile-app\">github.com/nooku/nooku-mobile-app</a>.</p>"
                ].join("")
            },
            
            // This is the recent news page. It uses a tree store to load its data from json
            {
                xtype: 'nestedlist',
                title: 'News',
                iconCls: 'star',
                displayField: 'title',

                store: {
                    type: 'tree',
                    
                    fields: [
                        {name: 'title', mapping: 'data.title'},
                        {name: 'introtext', mapping: 'data.introtext'},
                        {name: 'leaf', defaultValue: true }
                    ],

                    root: {
                        leaf: false,
                    },

                    proxy: {
                        type: 'jsonp',
                        url: 'http://demo.nooku.org/?format=json',
                        reader: {
                            type: 'json',
                            rootProperty: 'items'
                        }
                    }
                },

                detailCard: {
                    xtype: 'panel',
                    scrollable: true,
                    styleHtmlContent: true
                },

                listeners: {
                    itemtap: function(nestedList, list, index, element, post) {
                        this.getDetailCard().setHtml(post.get('introtext'));
                    }
                }
            }
        ]
    }
});
