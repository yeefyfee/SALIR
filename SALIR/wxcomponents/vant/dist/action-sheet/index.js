import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
VantComponent({
    classes: ['list-class'],
    mixins: [button],
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        description: String,
        round: {
            type: Boolean,
            value: true,
        },
        zIndex: {
            type: Number,
            value: 100,
        },
        actions: {
            type: Array,
            value: [],
        },
        overlay: {
            type: Boolean,
            value: true,
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true,
        },
        closeOnClickAction: {
            type: Boolean,
            value: true,
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true,
        },
        rootPortal: {
            type: Boolean,
            value: false,
        },
    },
    methods: {
        onSelect(event) {
            const { index } = event.currentTarget.dataset;
            const { actions, closeOnClickAction, canIUseGetUserProfile } = this.data;
            const item = actions[index];
            if (item) {
                this.triggerEvent('select', item);
                if (closeOnClickAction) {
                    this.onClose();
                }
                if (item.openType === 'getUserInfo' && canIUseGetUserProfile) {
                    wx.getUserProfile({
                        desc: item.getUserProfileDesc || '  ',
                        complete: (userProfile) => {
                            this.triggerEvent('getuserinfo', userProfile);
                        },
                    });
                }
            }
        },
        onCancel() {
            this.triggerEvent('cancel');
        },
        onClose() {
            this.triggerEvent('close');
        },
        onClickOverlay() {
            this.triggerEvent('click-overlay');
            this.onClose();
        },
    },
});
