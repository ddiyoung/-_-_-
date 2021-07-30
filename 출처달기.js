function OnScriptMacro_출처달기()
{       
    var sunji = ['①', '②', '③', '④', '⑤']

    var dapmun = '󰂼'

    var Theme = 5;
 
    var Mun_cnt = [18, 10, 17, 23, 23];

    var correct = [
        [5, 2, 3, 5 ,3 ,60, 10, 48, 5, 126, 1, 201, 3, 280, 420, 3, 292, 20],
        [3, 119, 3, 2, 105, 2, 5, 5, 10, 5],
        [1, 45, 40, 341, 5, 81, 2, 1, 30, 3, 9, 2, 5, 18, 2, 1, 2],
        [50, 110, 55, 6, 3, 88, 465, 4, 1, 1, 4, 775, 133, 880, 42, 2, 5, 5, 36, 5, 116, 324, 644],
        [25, 86, 125, 3, 2, 288, 90, 5, 35, 3, 2, 2, 5, 3, 44, 2, 4, 2, 5, 2, 1, 2, 5]
    ]

    //2020_시냅스_C1_T1_1

    var view = [ //선지 -> 1 , 수식 0
        [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1]
    ];

    var dapW = [675, 1350, 2025, 2700];

    function 조판부호()
	{
		HAction.GetDefault("Goto", HParameterSet.HGotoE.HSet);
		with (HParameterSet.HGotoE)
		{
		HSet.SetItem("DialogResult", 32);//31-미주,32-미주가기,37-수식가기
		SetSelectionIndex = 5;
		}
		HAction.Execute("Goto", HParameterSet.HGotoE.HSet);
	}

    HAction.Run("MoveTopLevelBegin");
    
    for(var i = 0; i< Theme; i++){
        for(var j = 0; j < Mun_cnt[i]; j++){
            조판부호();
            HAction.Run("MoveRight");
	        HAction.Run("MoveRight");
            HAction.GetDefault("InsertText", HParameterSet.HInsertText.HSet);
            HParameterSet.HInsertText.Text = dapmun+" ";
            HAction.Execute("InsertText", HParameterSet.HInsertText.HSet);
            if(view[i][j]){ //선지이면
                HAction.GetDefault("InsertText", HParameterSet.HInsertText.HSet);
                HParameterSet.HInsertText.Text = sunji[correct[i][j]-1].toString();
                HAction.Execute("InsertText", HParameterSet.HInsertText.HSet);
            }
            else{ //선지가 아니면
                HAction.GetDefault("EquationCreate", HParameterSet.HEqEdit.HSet);
                var dap = correct[i][j]
                with (HParameterSet.HEqEdit)
                {
                    Width = dapW[dap.length - 1];
                    Height = 1275;
                    String = dap.toString();
                    BaseUnit = PointToHwpUnit(13.0);
                }
                HAction.Execute("EquationCreate", HParameterSet.HEqEdit.HSet);
            }
            HAction.Run("BreakPara");
	        HAction.GetDefault("InsertText", HParameterSet.HInsertText.HSet);
            var T = (i+1).toString();
            var M = (j+1).toString();
	        HParameterSet.HInsertText.Text = "2022_시냅스_T"+T+'_'+M+'번';
	        HAction.Execute("InsertText", HParameterSet.HInsertText.HSet);
            HAction.Run("BreakPara");
            HAction.Run("CloseEx");
		    HAction.Run("MoveParaEnd");
        }
    }
}