package ssafy.fns.global.db.controller;

import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/db")
@CrossOrigin("*")
@Slf4j
public class DbController {
    @GetMapping("")
    public void input(){
        try {
            // 경로 설정
            Reader reader = new FileReader("D:\\park\\json\\전국통합식품영양성분정보(음식)표준데이터.json");
            // 파일 읽기
            JSONParser parser = new JSONParser();
            JSONObject data = (JSONObject) parser.parse(reader);

            JSONArray element = (JSONArray) data.get("records");
            /*
            * 식품명 name
            * 식품중량 volume
            * 에너지(kcal) kcal
            * 탄수화물 carbs
            * 단백질 protein;
            * 지방 fat
            * 수분 pollination
            * 당 sugar
            * 식이섬유 dietaryFiber
            * 칼슘 calcium
            * 칼륨 potassium
            * 철 iron
            * 인 phosphorus
            * 나트륨
            * 비타민A vitaminA
            * 비타민C vitaminC
            * 비타민D vitaminD
            * 콜레스테롤 cholesterol
            * 포화지방산 acid
            * 트랜스지방산 transFat
            * 업체명
            * */

            for (int i = 0; i < element.size(); i++) {
                JSONObject ob = (JSONObject) element.get(i);
                String name = (String) ob.get("식품명");
                String size = (String) ob.get("식품중량");
                int index = 0;
                for (int j = 0; j < size.length(); j++){
                    if(!Character.isDigit(size.charAt(j))){
                        index = j;
                        break;
                    }
                }
                Long volume = Long.parseLong(size.substring(0,index));
                Double kcal = Double.parseDouble((String) ob.get("에너지(kcal)"));
                Double carbs = Double.parseDouble((String) ob.get("탄수화물(g)"));
                Double protein = Double.parseDouble((String) ob.get("단백질(g)"));
                Double fat = Double.parseDouble((String) ob.get("지방(g)"));
                Double pollination = Double.parseDouble((String) ob.get("수분(g)"));
                Double sugar = Double.parseDouble((String) ob.get("당류(g)"));
                Double dietaryFiber = Double.parseDouble((String) ob.get("식이섬유(g)"));
                Double calcium = Double.parseDouble((String) ob.get("칼슘(mg)"));
                Double potassium = Double.parseDouble((String) ob.get("칼륨(mg)"));
                Double iron = Double.parseDouble((String) ob.get("철(mg)"));
                Double phosphorus = Double.parseDouble((String) ob.get("인(mg)"));
                Double sodium = Double.parseDouble((String) ob.get("나트륨(mg)"));
                Double vitaminA = Double.parseDouble((String) ob.get("비타민 A(μg RAE)"));
                Double vitaminC = Double.parseDouble((String) ob.get("비타민 C(mg)"));
                Double vitaminD = Double.parseDouble((String) ob.get("비타민 D(μg)"));
                Double cholesterol = Double.parseDouble((String) ob.get("콜레스테롤(mg)"));
                Double acid = Double.parseDouble((String) ob.get("포화지방산(g)"));
                Double transFat = Double.parseDouble((String) ob.get("트랜스지방산(g)"));

                System.out.println("음식 "+(i+1)+" : " + name+"\t"+volume+"\t"+kcal+" kcal");
                System.out.println("?????????????????????????????????????????????????????????????????????????????????????????");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
