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
import ssafy.fns.domain.food.entity.Food;
import ssafy.fns.domain.food.service.FoodService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/db")
@CrossOrigin("*")
@Slf4j
public class DbController {

    private final FoodService foodService;
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
            * */
            int id = 1;
            for (int i = 0; i < element.size(); i++) {
                JSONObject ob = (JSONObject) element.get(i);
                String name = (String) ob.get("식품명");
                // 중량에 단위가 붙어 있어써 때서 저장
                String volume = (String) ob.get("식품중량");
                int index = 0;
                for (int j = 0; j < volume.length(); j++){
                    if(!Character.isDigit(volume.charAt(j))){
                        index = j;
                        break;
                    }
                }
                int size = Integer.parseInt(volume.substring(0, index));
                Double rate = Double.parseDouble(volume.substring(0,index))/100.0;

                Double kcal = nullCheck((String) ob.get("에너지(kcal)"),rate);
                Double carbs = nullCheck((String) ob.get("탄수화물(g)"),rate);
                Double protein = nullCheck((String) ob.get("단백질(g)"),rate);
                Double fat = nullCheck((String) ob.get("지방(g)"),rate);

                if(kcal == -1.0 || carbs == -1.0 || protein == -1.0 || fat == -1.0) continue;

                Double pollination = nullCheck((String) ob.get("수분(g)"),rate);
                Double sugar = nullCheck((String) ob.get("당류(g)"),rate);
                Double dietaryFiber = nullCheck((String) ob.get("식이섬유(g)"),rate);
                Double calcium = nullCheck((String) ob.get("칼슘(mg)"),rate);
                Double potassium = nullCheck((String) ob.get("칼륨(mg)"),rate);
                Double iron = nullCheck((String) ob.get("철(mg)"),rate);
                Double phosphorus = nullCheck((String) ob.get("인(mg)"),rate);
                Double sodium = nullCheck((String) ob.get("나트륨(mg)"),rate);
                Double vitaminA = nullCheck((String) ob.get("비타민 A(μg RAE)"),rate);
                Double vitaminC = nullCheck((String) ob.get("비타민 C(mg)"),rate);
                Double vitaminD = nullCheck((String) ob.get("비타민 D(μg)"),rate);
                Double cholesterol = nullCheck((String) ob.get("콜레스테롤(mg)"),rate);
                Double acid = nullCheck((String) ob.get("포화지방산(g)"),rate);
                Double transFat = nullCheck((String) ob.get("트랜스지방산(g)"),rate);

//                System.out.println("음식 "+(id++)+" : " + name+",\t"+volume+",\t"+kcal+" kcal,\t"+carbs+",\t"+protein+",\t"+fat);
//                System.out.println("?????????????????????????????????????????????????????????????????????????????????????????");

                Food food = new Food(name, size, kcal, carbs, protein, fat,
                        pollination, sugar, dietaryFiber, calcium, potassium,
                        iron, phosphorus, sodium, vitaminA, vitaminC,
                        vitaminD, cholesterol, acid, transFat);

                foodService.inputFood(food);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Double nullCheck(String nutrition, Double rate){
        if(nutrition.isEmpty())
            return -1.0;
        Double temp = Double.parseDouble(nutrition)*rate;
        return (double) Math.round(temp*10)/10.0;
    }
}
