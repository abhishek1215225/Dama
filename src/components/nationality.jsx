import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

const nationalityMap = {
    AF: 'Afghan',
    AL: 'Albanian',
    DZ: 'Algerian',
    AS: 'American Samoan',
    AD: 'Andorran',
    AO: 'Angolan',
    AI: 'Anguillan',
    AQ: 'Antarctic',
    AG: 'Antiguan or Barbudan',
    AR: 'Argentine',
    AM: 'Armenian',
    AW: 'Aruban',
    AU: 'Australian',
    AT: 'Austrian',
    AZ: 'Azerbaijani',
    BS: 'Bahamian',
    BH: 'Bahraini',
    BD: 'Bangladeshi',
    BB: 'Barbadian',
    BY: 'Belarusian',
    BE: 'Belgian',
    BZ: 'Belizean',
    BJ: 'Beninese',
    BM: 'Bermudian',
    BT: 'Bhutanese',
    BO: 'Bolivian',
    BA: 'Bosnian',
    BW: 'Botswana',
    BR: 'Brazilian',
    IO: 'British Indian Ocean Territory',
    BN: 'Bruneian',
    BG: 'Bulgarian',
    BF: 'Burkinabe',
    BI: 'Burundian',
    CV: 'Cape Verdean',
    KH: 'Cambodian',
    CM: 'Cameroonian',
    CA: 'Canadian',
    KY: 'Caymanian',
    CF: 'Central African',
    TD: 'Chadian',
    CL: 'Chilean',
    CN: 'Chinese',
    CO: 'Colombian',
    KM: 'Comoran',
    CG: 'Congolese',
    CD: 'Congolese',
    CK: 'Cook Islander',
    CR: 'Costa Rican',
    HR: 'Croatian',
    CU: 'Cuban',
    CW: 'Curaçaoan',
    CY: 'Cypriot',
    CZ: 'Czech',
    DK: 'Danish',
    DJ: 'Djiboutian',
    DM: 'Dominican',
    DO: 'Dominican Republic',
    EC: 'Ecuadorian',
    EG: 'Egyptian',
    SV: 'Salvadoran',
    GQ: 'Equatorial Guinean',
    ER: 'Eritrean',
    EE: 'Estonian',
    SZ: 'Eswatini',
    ET: 'Ethiopian',
    FJ: 'Fijian',
    FI: 'Finnish',
    FR: 'French',
    GA: 'Gabonese',
    GM: 'Gambian',
    GE: 'Georgian',
    DE: 'German',
    GH: 'Ghanaian',
    GI: 'Gibraltarian',
    GR: 'Greek',
    GL: 'Greenlandic',
    GD: 'Grenadian',
    GP: 'Guadeloupean',
    GU: 'Guamanian',
    GT: 'Guatemalan',
    GG: 'Guernsey',
    GN: 'Guinean',
    GW: 'Bissau-Guinean',
    GY: 'Guyanese',
    HT: 'Haitian',
    HM: 'Heard and McDonald Islands',
    VA: 'Holy See',
    HN: 'Honduran',
    HK: 'Hong Konger',
    HU: 'Hungarian',
    IS: 'Icelandic',
    IN: 'Indian',
    ID: 'Indonesian',
    IR: 'Iranian',
    IQ: 'Iraqi',
    IE: 'Irish',
    IM: 'Isle of Man',
    IL: 'Israeli',
    IT: 'Italian',
    JM: 'Jamaican',
    JP: 'Japanese',
    JE: 'Jersey',
    JO: 'Jordanian',
    KZ: 'Kazakhstani',
    KE: 'Kenyan',
    KI: 'Kittitian or Nevisian',
    KP: 'North Korean',
    KR: 'South Korean',
    KW: 'Kuwaiti',
    KG: 'Kyrgyz',
    LA: 'Lao',
    LV: 'Latvian',
    LB: 'Lebanese',
    LS: 'Basotho',
    LR: 'Liberian',
    LY: 'Libyan',
    LI: 'Liechtenstein',
    LT: 'Lithuanian',
    LU: 'Luxembourger',
    MO: 'Macao',
    MG: 'Malagasy',
    MW: 'Malawian',
    MY: 'Malaysian',
    MV: 'Maldivian',
    ML: 'Malian',
    MT: 'Maltese',
    MH: 'Marshallese',
    MQ: 'Martiniquais',
    MR: 'Mauritanian',
    MU: 'Mauritian',
    YT: 'Mayotte',
    MX: 'Mexican',
    FM: 'Micronesian',
    MD: 'Moldovan',
    MC: 'Monégasque',
    MN: 'Mongolian',
    ME: 'Montenegrin',
    MS: 'Montserratian',
    MA: 'Moroccan',
    MZ: 'Mozambican',
    MM: 'Myanmar',
    NA: 'Namibian',
    NR: 'Nauruan',
    NP: 'Nepalese',
    NL: 'Dutch',
    NZ: 'New Zealander',
    NI: 'Nicaraguan',
    NE: 'Nigerien',
    NG: 'Nigerian',
    NU: 'Niuean',
    NF: 'Norfolk Islander',
    MP: 'Northern Mariana Islander',
    NO: 'Norwegian',
    OM: 'Omani',
    PK: 'Pakistani',
    PW: 'Palauan',
    PS: 'Palestinian',
    PA: 'Panamanian',
    PG: 'Papua New Guinean',
    PY: 'Paraguayan',
    PE: 'Peruvian',
    PH: 'Philippine',
    PL: 'Polish',
    PT: 'Portuguese',
    PR: 'Puerto Rican',
    QA: 'Qatari',
    RE: 'Réunionese',
    RO: 'Romanian',
    RU: 'Russian',
    RW: 'Rwandan',
    BL: 'Saint Barthélemy',
    SH: 'Saint Helenian',
    KN: 'Saint Kitts and Nevis',
    LC: 'Saint Lucian',
    PM: 'Saint Pierre and Miquelon',
    VC: 'Saint Vincentian',
    WS: 'Samoan',
    SM: 'Sammarinese',
    ST: 'Sao Tomean',
    SA: 'Saudi',
    SN: 'Senegalese',
    RS: 'Serbian',
    SC: 'Seychellois',
    SL: 'Sierra Leonean',
    SG: 'Singaporean',
    SX: 'Sint Maarten',
    SK: 'Slovak',
    SI: 'Slovenian',
    SB: 'Solomon Islander',
    SO: 'Somali',
    ZA: 'South African',
    GS: 'South Georgia',
    SS: 'South Sudanese',
    ES: 'Spanish',
    LK: 'Sri Lankan',
    SD: 'Sudanese',
    SR: 'Surinamese',
    SJ: 'Svalbard',
    SE: 'Swedish',
    CH: 'Swiss',
    SY: 'Syrian',
    TW: 'Taiwanese',
    TJ: 'Tajik',
    TZ: 'Tanzanian',
    TH: 'Thai',
    TL: 'Timorese',
    TG: 'Togolese',
    TK: 'Tokelauan',
    TO: 'Tongan',
    TT: 'Trinidadian',
    TN: 'Tunisian',
    TR: 'Turkish',
    TM: 'Turkmen',
    TC: 'Turks and Caicos Islander',
    TV: 'Tuvaluan',
    UG: 'Ugandan',
    UA: 'Ukrainian',
    AE: 'Emirati',
    UY: 'Uruguayan',
    UZ: 'Uzbekistani',
    VU: 'Ni-Vanuatu',
    VE: 'Venezuelan',
    VN: 'Vietnamese',
    WF: 'Wallisian',
    EH: 'Western Saharan',
    YE: 'Yemeni',
    ZM: 'Zambian',
    ZW: 'Zimbabwean',
  };

  const Nationality = ({ selectedNationality, setSelectedNationality }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        setSearchTerm(''); // Reset search term when closing the modal
    };

    const handleSelectNationality = (nationality) => {
        setSelectedNationality(nationality); // Update the selected country in the parent
        toggleModal();
    };

    const renderCountryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => handleSelectNationality(item)}
        >
            <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
    );

    const filteredCountries = Object.values(nationalityMap).filter(nationality =>
      nationality.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.selectButton}
                onPress={toggleModal}
            >
                <Text style={[styles.buttonText, { color: selectedNationality ? 'black' : '#94A3B8' }]}>
                    {selectedNationality || 'Select Nationality'}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Nationality"
                        placeholderTextColor="#94A3B8"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <FlatList
                        data={filteredCountries}
                        keyExtractor={(item) => item}
                        renderItem={renderCountryItem}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: wp('3%'), // Responsive padding
    },
    selectButton: {
        width: wp('80%'), // Responsive width based on screen size
        height: hp('6%'), // Responsive height
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: wp('4%'), // Responsive horizontal padding
    },
    buttonText: {
        fontSize: moderateScale(16), // Responsive font size
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: wp('5%'), // Responsive padding
    },
    searchInput: {
        height: hp('5%'), // Responsive height for the input
        borderColor: '#CBD5E1',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: wp('3%'), // Responsive horizontal padding
        marginBottom: hp('2%'), // Responsive bottom margin
    },
    item: {
        padding: wp('4%'), // Responsive padding inside each item
        borderBottomWidth: 1,
        borderBottomColor: '#CBD5E1',
    },
    itemText: {
        fontSize: moderateScale(16), // Responsive font size for item text
        color: '#333',
    },
});


export default Nationality;
