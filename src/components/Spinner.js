import React from "react";
import { NativeBaseProvider, Spinner, HStack, Heading } from "native-base";

import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
} from 'react-native';

const LodingSpineer = () => {
    return(
        <NativeBaseProvider>
                <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Loading...
                    </Heading>
                </HStack>
        </NativeBaseProvider>
    )
}

export default LodingSpineer