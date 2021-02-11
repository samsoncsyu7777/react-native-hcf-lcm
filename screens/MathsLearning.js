import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import theme from "../Theme";
import {
  withTheme,
} from 'react-native-paper';
import {
  HeadingSelect,
} from "../components/MathsLearningComponents";
import {
  HCFFactorization,
} from "./HCFFactorization";
import {
  LCMMultiplication,
} from "./LCMMultiplication";
import {
  HCFPrimeFactorization,
} from "./HCFPrimeFactorization";
import {
  LCMPrimeFactorization,
} from "./LCMPrimeFactorization";
import {
  HCFDivision,
} from "./HCFDivision";
import {
  LCMDivision,
} from "./LCMDivision";
import pic1 from "../assets/cross1.png";
import pic2 from "../assets/cross2.jpg";
import pic3 from "../assets/zacchaeus1.jpg";
import prayerImage from "../assets/prayer1.jpg";
import constants from "../Constants";

const breakpoint = constants.breakpoint;

function MathsLearning(props) {
  const [languageIndex, setLanguageIndex] = useState(2);//0:繁體中文
  const [bibleVersionIndex, setBibleVersionIndex] = useState(0);//0:catholic,1:christian
  const [topicIndex, setTopicIndex] = useState(0);
  const [learningToolIndex, setLearningToolIndex] = useState(0);
  const [scriptureVerseIndex, setScriptureVerseIndex] = useState(0);

  const numberOfBibleVersions = 2;
  const numberOfTopics = 2;
  const numberOfLearningTools = 3;
  const numberOfScriptureVerses = 3;
  const scriptureImages = [pic1, pic2, pic3];
  const languages = ["繁體中文", "简体中文", "English", "Française"];
  const bibleVersions = ["天主教", "基督教", "天主教", "基督教", "Catholic", "Christian", "Catholique", "Chrétienne"];
  const bibleVersionsQuestion = ["經文版本", "经文版本", "Scripture version", "Version biblique"];
  const topics = [
    "H.C.F./G.C.F.(最大公因數)", "L.C.M.(最小公倍數)",
    "H.C.F./G.C.F.(最大公因数)", "L.C.M.(最小公倍数)",
    "H.C.F./G.C.F.(Highest/Greatest Common Factor)", "L.C.M.(Least Common Multiple)",
    "H.C.F./G.C.F.(Facteur commun le plus élevé / le plus grand)", "L.C.M.(Multiple moins commun)"
  ];
  const topicsQuestion = ["主題", "主题", "Topic", "Sujet"];
  const learningTools = [
    "列舉法", "質因數分解法", "短除法",//H.C.F.
    "列舉法", "質因數分解法", "短除法",//L.C.M.
    "列举法", "质因数分解法", "短除法",
    "列举法", "质因数分解法", "短除法",
    "Factorization Method", "Prime Factorization Method", "Division Method",
    "Multiplication Method", "Prime Factorization Method", "Division Method",
    "Méthode de factorisation", "Méthode de factorisation principale", "Méthode de division",
    "Méthode de multiplication", "Méthode de factorisation principale", "Méthode de division"
  ];
  const learningToolsQuestion = [
    "計算方法", "计算方法", "Calculation Method", "Méthode de calcul"
  ];
  const scriptureVerses = [
    //traditional chinese
    "「有的落在好地裡，就長大成熟，結了果實，有的結三十倍，有的六十倍，有的一百倍。」谷4:8",
    "「那撒在好地裡的，是指人聽了這「話」，就接受了，並結了果實，有的三十倍，有的六十倍，有的一百倍。」谷4:20",
    "匝凱站起來對主說：「主，你看，我把我財物的一半施捨給窮人；我如果欺騙過誰，我就以四倍賠償。」路19:8",
    "「又有的落在好土裏，就發芽長大，結出果實，有三十倍的，有六十倍的，有一百倍的。」可4:8",
    "「那撒在好土裏的，就是人聽了道，領受了，並且結了果實，有三十倍的，有六十倍的，有一百倍的。」可4:20",
    "撒該站著對主說：「主啊，我把所有的一半給窮人；我若勒索了誰，就還他四倍。」路19:8",
    //simplified chinese
    "「有的落在好地里，就长大成熟，结了果实，有的结三十倍，有的六十倍，有的一百倍。」谷4:8",
    "「那撒在好地里的，是指人听了这「话」，就接受了，并结了果实，有的三十倍，有的六十倍，有的一百倍。 」谷4:20",
    "匝凯站起来对主说：「主，你看，我把我财物的一半施舍给穷人；我如果欺骗过谁，我就以四倍赔偿。」路19:8",
    "「又有的落在好土里，就发芽长大，结出果实，有三十倍的，有六十倍的，有一百倍的。」可4:8",
    "「那撒在好土里的，就是人听了道，领受了，并且结了果实，有三十倍的，有六十倍的，有一百倍的。」可4:20",
    "撒该站着对主说：「主啊，我把所有的一半给穷人；我若勒索了谁，就还他四倍。」路19:8",
    //english
    "'And some seeds fell into rich soil, grew tall and strong, and produced a good crop; the yield was thirty, sixty, even a hundredfold.'Mark4:8",
    "'And there are those who have been sown in rich soil; they hear the word and accept it and yield a harvest, thirty and sixty and a hundredfold.'Mark4:20",
    "But Zacchaeus stood his ground and said to the Lord, 'Look, sir, I am going to give half my property to the poor, and if I have cheated anybody I will pay him back four times the amount.'Luke19:8",
    "'And some, falling on good earth, gave fruit, coming up and increasing, and giving thirty, sixty, and a hundred times as much.'Mark4:8",
    "'And these are they who were planted on the good earth; such as give ear to the word, and take it into their hearts, and give fruit, thirty and sixty and a hundred times as much.'Mark4:20",
    "And Zacchaeus, waiting before him, said to the Lord, See, Lord, half of my goods I give to the poor, and if I have taken anything from anyone wrongly, I give him back four times as much.Luke19:8",
    //french
    "'Et d'autres tombèrent dans la bonne terre, montèrent et crûrent, donnèrent du fruit et rapportèrent l'un trente, un autre soixante, un autre cent.'Marc4:8",
    "'Et d'autres sont ceux qui ont été semés dans la bonne terre : ils entendent la parole et la reçoivent, et ils portent du fruit, trente, soixante, cent (pour un).'Marc4:20",
    "Or Zachée, s'étant arrêté, dit au Seigneur: ' Voici, Seigneur, je donne aux pauvres la moitié de mes biens; et si j'ai fait du tort à quelqu'un, je rends le quadruple.'Luc19:8",
    "« Une autre partie tomba dans la bonne terre ; elle donna du fruit qui montait et se développait, avec un rapport de 30, 60 ou 100 pour 1 »'Marc4:8",
    "« D'autres enfin reçoivent la semence dans la bonne terre : ce sont ceux qui entendent la parole, l’accueillent et portent du fruit, avec un rapport de 30, 60 ou 100 pour 1. »Marc4:20",
    "Mais Zachée, se tenant devant le Seigneur, lui dit : « Seigneur, je donne aux pauvres la moitié de mes biens et, si j'ai causé du tort à quelqu'un, je lui rends le quadruple. »Luc19:8"
  ];
  const prayers = [
    "主耶穌，感謝祢賜我恩竉，幫助我在生命中結出永遠的果實﹗",
    "主耶稣，感谢祢赐我恩竉，帮助我在生命中结出永远的果实﹗",
    "Lord Jesus, thank you for giving me grace and helping me bear eternal fruit in my life!",
    "Seigneur Jésus, merci de me donner la grâce et de m'aider à porter le fruit éternel dans ma vie!"
  ];
  const noticificationText = [
    "開啟通知，計算過程會顯示提示。",
    "开启通知，计算过程会显示提示。",
    "Turn on the notification, prompts will be displayed during the calculation.",
    "Activez la notification, des invites seront affichées pendant le calcul."
  ];

  useEffect(() => {
    setScriptureVerseIndex(Math.floor(Math.random() * numberOfScriptureVerses));
  }, []);

  const renderSwitch = () => {
    switch (topicIndex) {
      case 0: {
        switch (learningToolIndex) {
          case 0:
            return <HCFFactorization
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
          case 1:
            return <HCFPrimeFactorization
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
          case 2:
            return <HCFDivision
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
        };
      };
      case 1: {
        switch (learningToolIndex) {
          case 0:
            return <LCMMultiplication
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
          case 1:
            return <LCMPrimeFactorization
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
          case 2:
            return <LCMDivision
              languageIndex={languageIndex}
              topic={topics[languageIndex * numberOfTopics + topicIndex]}
              learningTool={learningTools[(languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools + learningToolIndex]}
            />
        };
      };
    };
  };

  return (
    <View style={styles.mathsLearningContainer} spacing={0}>
      <LinearGradient
        colors={['#EFFFFF', '#AFF0FF']}
        style={styles.linearGradient}
      >
        <ScrollView>
          <View style={styles.headingContainer}>
            <HeadingSelect
              selectLabel="Language"
              selectIndex={languageIndex}
              setItemIndex={setLanguageIndex}
              itemsArray={languages}
            />
            <HeadingSelect
              selectLabel={bibleVersionsQuestion[languageIndex]}
              selectIndex={bibleVersionIndex}
              setItemIndex={setBibleVersionIndex}
              itemsArray={bibleVersions.slice(languageIndex * numberOfBibleVersions, languageIndex * numberOfBibleVersions + numberOfBibleVersions)}
            />
            <HeadingSelect
              selectLabel={topicsQuestion[languageIndex]}
              selectIndex={topicIndex}
              setItemIndex={setTopicIndex}
              itemsArray={topics.slice(languageIndex * numberOfTopics, languageIndex * numberOfTopics + numberOfTopics)}
            />
            <HeadingSelect
              selectLabel={learningToolsQuestion[languageIndex]}
              selectIndex={learningToolIndex}
              setItemIndex={setLearningToolIndex}
              itemsArray={learningTools.slice((languageIndex * numberOfTopics + topicIndex) * numberOfLearningTools, (languageIndex * numberOfTopics + topicIndex + 1) * numberOfLearningTools)}
            />
          </View>
          <View style={styles.scriptureVerseRow} >
            <LinearGradient
              start={[0, 1]}
              end={[1, 0]}
              colors={['aqua', 'blue', 'magenta', 'red', 'orange']}
              style={[styles.scriptureVerseBorder, styles.scriptureBorderWidth]}
            >
              <View style={[styles.scriptureVerseBorder, styles.scriptureBgColor]}>
                <Image style={styles.scriptureImage} source={scriptureImages[scriptureVerseIndex]} resizeMode="contain" />
                <Text style={styles.scriptureVerse}>{scriptureVerses[(languageIndex * numberOfBibleVersions + bibleVersionIndex) * numberOfScriptureVerses + scriptureVerseIndex]}</Text>
              </View>
            </LinearGradient>
          </View>
          {
            renderSwitch()
          }
          <View style={styles.prayerRow}>
            <Image style={styles.prayerImage} source={prayerImage} resizeMode="contain" />
            <Text style={styles.prayerText}>{prayers[languageIndex]}</Text>
          </View>
          <View style={styles.prayerRow}>
            <Text style={styles.commonText}>{noticificationText[languageIndex]}</Text>
          </View>
          <View style={styles.emailRow}>
            <Text style={styles.emailText}>samsoncsyuapple@gmail.com</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );

}
/*
          <View style={{ width: 130, borderWidth: 5, borderColor: 'brown'}}>
            <LinearGradient
              start={[0, 1]}
              end={[1, 0]}
              colors={['purple', 'magenta', 'red', 'orange', 'yellow']}
              style={{ width: 120, height: 120, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ fontSize: 30 , color: "#4400AA", fontWeight: 600}}>H.C.F.</Text>
              <Text style={{ fontSize: 30 , color: "#4400AA"}}>and</Text>
              <Text style={{ fontSize: 30 , color: "#4400AA", fontWeight: 600}}>L.C.M.</Text>
            </LinearGradient>
          </View>
*/
export default withTheme(MathsLearning);

const styles = StyleSheet.create({
  mathsLearningContainer: {
    margin: wp2dp('0.3%'),
    minHeight: hp2dp('97%'),
  },
  linearGradient: {
    margin: wp2dp('0.3%'),
    minHeight: hp2dp('97%'),
  },
  headingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scriptureVerseRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scriptureBorderWidth: {
    width: wp2dp('100%') < breakpoint ? wp2dp('97%') : wp2dp('82%'),
  },
  scriptureVerseBorder: {
    flexDirection: "row",
    alignItems: "center",
    width: wp2dp('100%') < breakpoint ? wp2dp('95%') : wp2dp('80%'),
    margin: wp2dp('1%'),
  },
  scriptureBgColor: {
    backgroundColor: theme.colors.myWhite,
  },
  scriptureImage: {
    height: wp2dp('100%') < breakpoint ? wp2dp('16%') : wp2dp('8%'),
    width: wp2dp('100%') < breakpoint ? wp2dp('16%') : wp2dp('8%'),
    padding: wp2dp('0.5%'),
  },
  scriptureVerse: {
    width: wp2dp('100%') < breakpoint ? wp2dp('78%') : wp2dp('70%'),
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
    color: theme.colors.myGreen,
  },
  prayerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  prayerImage: {
    height: wp2dp('100%') < breakpoint ? wp2dp('12%') : wp2dp('6%'),
    width: wp2dp('100%') < breakpoint ? wp2dp('12%') : wp2dp('6%'),
    padding: wp2dp('0.5%'),
  },
  prayerText: {
    width: wp2dp('100%') < breakpoint ? wp2dp('80%') : wp2dp('65%'),
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('4%') : wp2dp('2%'),
    color: theme.colors.myGreen,
  },
  emailText: {
    width: wp2dp('92%'),
    textAlign: "right",
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('3%') : wp2dp('1.5%'),
    color: theme.colors.myBrown,
    marginBottom: wp2dp('100%') < breakpoint ? wp2dp('15%') : wp2dp('0%'),
  },
  commonText: {
    fontSize: wp2dp('100%') < breakpoint ? wp2dp('2.8%') : wp2dp('1.4%'),
    textAlign: "center",
  },
});
