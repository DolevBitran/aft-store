import { NavigationContainerRef } from "@react-navigation/native";
import { Socket } from "socket.io-client";
import { Animated, ListRenderItem, StyleProp, ViewStyle } from "react-native";
import { ImagePickerAsset } from "expo-image-picker";


declare global {


    // ==================== ENUMS ====================


    // enum ROOM_MODE {
    //     TABLE = 0,
    //     SUMMARY = 1
    // }

    // ==================== TYPES ====================

    type IAsset = ImagePickerAsset & {
        _id?: string;
        assetId: string;
        fileExtension: string;
    }

    type Category = {
        title: string;
        _id: string;
    }

    type AppNavigationContainer = NavigationContainerRef<{
        Dashboard: React.FC;
        Store: React.FC;
        Login: React.FC;
        Create: React.FC;
    }>

    interface SocketEvent {
        name: string;
        handler: () => unknown;
    }

    type User = {
        id: string;
        googleId: boolean;
        email: string;
        name: string;
        picture?: string;
    }

    interface IRoomOptions {
        deck?: DeckType;
    }

    type ISummaryData = { [id: IGuest['id']]: Vote[] }

    type Nullable<T> = T | null;

    interface AppState {
        navigator: Navigation | null;
        ejectInterceptors: Nullable<() => void>;
        RTL: boolean;
    }

    interface AuthState {
        user: User | null;
        token: string | null;
    }

    interface ProductsState {
        categories: Category[]
        products: ProductData[]
        categoryProducts: {
            [categoryId: string]: ProductData[]
        }
    }

    interface ProductState {
        product: ProductData | null
    }

    interface CartState {
        cartItems: CartItem[]
    }

    type MediaState = {
        upload: {
            [assetId: string]: {
                percentage: number
            }
        },
        assets: {
            [assetId: string]: IAsset
        },
    }


    interface RoomState {
        socket: Socket | null;
        id: string | null;
        name: string | null;
        guests: IGuest[];
        roundsHistory: IRound[];
        currentRound: IRound;
        options: IRoomOptions;
        guestName: string;
        selectedCardIndex: number | null;
    }

    type ProductData = {
        title: string
        category: Category[]
        price: number
        description: string
        _id: string
        media: {
            images: ImageData[]
            videos?: VideoData[]
        }
    }

    type CartItem = {
        productId: string
        sessionId: string
        product: ProductData
    }

    type ImageData = {
        source: string
    }

    type VideoData = {
        source: string
    }

    // ==================== PAYLOADS ====================

    interface CreateRoomProps {
        hostName: string;
        roomName: string;
    }

    interface JoinRoomProps {
        id: RoomState['id'];
        guestName: IGuest['name'];
        guestId?: IGuest['id']
    }

    interface CloseRoomProps {
    }

    interface initializeRoomProps {
        room: IRoom;
        admin_secret?: string;
        guestId: IGuest['id'];
    }

    interface VoteProps {
        roomId: string;
        value: number;
    }

    interface NextRoundProps {
        roomId: string;
        // value: number;
    }

    // ==================== RESPONSES ====================

    interface CreateRoomResponse {
        id: IRoom['id'];
        hostId: string;
        admin_secret?: string;
        room: IRoom;
    }

    interface JoinRoomResponse {
        id: IRoom['id'];
        hostId: IGuest['id'];
        guestId: IGuest['id'];
        admin_secret?: string;
        room: IRoom;
    }

    interface CloseRoomResponse {
    }

    interface VoteResponse {
        success: boolean
    }

    interface NextRoundResponse {
        success: boolean
    }



    // ==================== Carousel ====================

    interface CarouselProps
        extends Partial<
            Omit<
                PressablePaginationProps,
                "data" | "scrollX" | "getIndex" | "itemWidth"
            >
        > {
        /**
         * Used to pass in array of elements that should be rendered
         *
         * The same as data prop in FlatList component
         *
         */
        data: Array<any>;
        /**
         * Takes an item from data props and renders it as required
         *
         * The same as renderItem prop in FlatList component
         *
         */
        renderItem: ListRenderItem<any>;
        /**
         * Used to apply styling to the main container that wraps both: carousel and pagination
         *
         */
        mainContainerStyle?: StyleProp<ViewStyle>;
        /**
         * Equivalent to 'style' prop in FlatList and has the same affect to the Carousel
         *
         */
        carouselContainerStyle?: StyleProp<ViewStyle>;
        /**
         * Equivalent to 'contentContainerStyle' prop in FlatList and has the same affect to the Carousel
         *
         */
        carouselContentContainerStyle?: StyleProp<ViewStyle>;
        /**
         * Used to apply styling to the container that wraps the pagination
         *
         */
        paginationContainerStyle?: StyleProp<ViewStyle>;
        /**
           * Is used to adjust inputRange of interpolated animations of pagination.
           * 
           * Has to match to the width of renderItem.
           * 
           * If not set, the device screen width will be used.
           ```
           Dimensions.get('window').width
           ```
           */
        widthBoundaryForPagination?: number;
        /**
         * Is used to disable pagination. Default is set to false.
         *
           ```
           disablePagination={true}
           ```
         */
        disablePagination?: boolean;
        /**
         * Called once the last element of the Carousel is displayed
         *
         */
        isEndReached?: (endReached: boolean) => void;
    }

    interface PaginationProps {
        data: Array<any>;
        scrollX: Animated.AnimatedInterpolation<string | number>;
        getIndex: (idx: number) => void;
        itemWidth: number;
        /**
           * Is used to adjust dynamic width of each pagination indicator.
           * 
           * Has to be an array of 3 numbers where the second element of array will be assigned to width of the active indicator
           * 
           * Default value is [20,40,20]
           * 
           * If static width is required, pass an array of three equal numbers as: [10,10,10]
           * Example:.
           ```
           indicatorWidth={[15,30,15]}
           ```
           */
        indicatorWidth: Array<number>;
        /**
           * Is used to adjust dynamic height of each pagination indicator.
           * 
           * Has to be an array of 3 numbers where the second element of array will be assigned to height of the active indicator
           * 
           * Default value is [15,15,15]
           * 
           * If static width is required, pass an array of three equal numbers as: [10,10,10]
           * Example:.
           ```
           indicatorHeight={[15,30,15]}
           ```
           */
        indicatorHeight: Array<number>;
        /**
           * Is used to adjust dynamic color of each pagination indicator.
           * 
           * Has to be an array of 3 strings/colors where the second element of array will be assigned to color of the active indicator
           * 
           * Default value is ['grey', 'black', 'grey']
           * 
           * If static width is required, pass an array of three equal numbers as: ['grey', 'grey', 'grey']
           * Example:.
           ```
           indicatorColor={['grey', 'black', 'grey']}
           ```
           */
        indicatorColor: Array<string>;
        /**
         * Is used to adjust borderRadius of each pagination indicator.
         *
         * Has to be a number
         *
         * Default value is 5
         */
        inidicatorBorderRadius: number;
        /**
         * Is used to adjust horizontalPadding of each pagination indicator.
         *
         * Has to be a number
         *
         * Default value is 10
         */
        indicatorHorizontalPadding: number;
        /**
         * Is used to change backgroundColor of each pagination container.
         *
         * Has to be a string
         *
         * Default value is 'transparent'
         */
        paginataionBackgroundColor: string;
    }

    interface RefProps {
        showNextItem: () => void;
        showPreviousItem: () => void;
    }

}