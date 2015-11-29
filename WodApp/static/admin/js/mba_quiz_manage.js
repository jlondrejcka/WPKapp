quizdefined=0;
IS_MULTI=0;
IS_TRUEFALSE=1;
function should_check(answer,cur)
{
	if(answer==cur)
		return ' checked';
}
var TableEditable_Quiz = function () {
	return {
		//main function to initiate the module
		init: function () {
			function ajax_helper(form_data,nRow)
			{
				$.ajax({
					url: base_url+"api/service/question",
					type: 'POST',
					data: form_data,
					success: function(msg)
					{
						if(msg.success==1)
						{
							if(msg.from=='add')
							{
								$(nEditing).attr('question_id',msg.question.question_id);
								saveRow(oTable,nEditing);
//								tds=$(nEditing).find('td');
//								$(tds[1]).addClass('center');
//								$(tds[2]).addClass('center');
								nEditing = null;
							}
							else if(msg.from=='update')
							{
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else if(msg.from=='delete')
							{
								oTable.fnDeleteRow(nRow);
							}
						}
						else
						{
							if(msg.from=='update')
							{
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else
								alert("Error:"+JSON.stringify(msg));
						}
					}
				}).fail( function(msg)
				{
						alert('Failed Operation:'+JSON.stringify(msg));
				});
				return false;
			}


			//		Restore Row
			function restoreRow(oTable, nRow) {
				var aData = oTable.fnGetData(nRow);
				var jqTds = $('>td', nRow);

				for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
					oTable.fnUpdate(aData[i], nRow, i, false);
				}
				$(nRow).find('input[type=radio]').attr('disabled',true);
			}

			//		Edit Row

			function editRow(oTable, nRow) {
				var aData = oTable.fnGetData(nRow);
				var jqTds = $('>td', nRow);
				jqTds[0].innerHTML = '<input type="text" class="span12" value="' + $(aData[0]).html() + '" id="question_no">';
				jqTds[1].innerHTML = '<input type="text" class="span12" value="' + aData[1] + '" id="question">';
				lbls=$(aData[2]).find('label');
				q_type=$(nRow).attr('question_type');
				q_id=$(nRow).attr('question_id');
				answer=$('input[name=question'+q_id+']:checked').val();
				if(q_type==IS_MULTI)
				{
					jqTds[2].innerHTML='<div class="span12 new_quiz_div" quiz_type="0"><input type="radio" name="new_quiz" value="0"/> <input type="text" id="choice1" value="'+$(lbls[0]).text()+'"></br>'+
					'<input type="radio" name="new_quiz" value="1" /> <input type="text" id="choice2" value="'+$(lbls[1]).text()+'"></br>'+
					'<input type="radio" name="new_quiz" value="2" /> <input type="text" id="choice3" value="'+$(lbls[2]).text()+'"></br>'+
					'<input type="radio" name="new_quiz" value="3" /> <input type="text" id="choice4" value="'+$(lbls[3]).text()+'"></br></div>';
					$('input[name=new_quiz][value='+answer+']').attr('checked',true);
//					$(lbls[0]).text('great');//'<input type="text" id="choice1" value="'+$(lbls[0]).text()+'">')
//					'<input type="radio" name="new_quiz" value="2" /> <input type="text" id="choice3"></br>'+
//					'<input type="radio" name="new_quiz" value="3" /> <input type="text" id="choice4"></br></div>';
				}
				else
				{
					jqTds[2].innerHTML='<div class="span12 new_quiz_div" quiz_type="1"><label class="radio"><input type="radio" name="new_quiz" '+should_check(answer,1)+' value="1"/> True</br>'+
					'<label class="radio"><input type="radio" name="new_quiz" value="0" '+should_check(answer,0)+'/> False</br></div>';
				}

				jqTds[3].innerHTML = '<a href="javascript:void(0)" class="edit btn btn-primary btn-small" stats="Save">Save</a> <a href="javascript:void(0)" class="cancel btn btn-warning btn-small">Cancel</a>';

/*
				var aiNew = oTable.fnAddData(['<input type="text" class="span12" value="" id="question_no">','<input type="text" class="span12" value="" id="question">',
					query,'<a href="javascript:void(0)" class="edit btn btn-primary btn-small" stats="Save">Save</a> <a href="javascript:void(0)" data-mode="new" class="cancel btn btn-warning btn-small">Cancel</a>']);
				var nRow = oTable.fnGetNodes(aiNew[0]);			*/
			
			}

			//		Save Row

			function saveRow(oTable, nRow) {
//							var jqInputs = $('input', nRow);
				var aData = oTable.fnGetData(nRow);

				oTable.fnUpdate('<span>'+$('#question_no').val()+'</span>', nRow, 0, false);
				oTable.fnUpdate($('#question').val(), nRow, 1, false);

				q_type=$('.new_quiz_div').attr('quiz_type');
				q_answer=$('input[name=new_quiz]:checked').val();
				a_div='<div class="with_answer">';
				q_id=$(nRow).attr('question_id');
				if(q_type==IS_MULTI)
				{
					q_texts=$('.new_quiz_div input[type=text]');
					for(ii=0;ii<4;ii++)
					{
						a_div+='<label class="radio"><input type="radio" name="question'+q_id+'" value="'+ii+'"'+should_check(q_answer,ii)+' >'+$('#choice'+(ii+1)).val()+'</label>';
						if(ii!=3)
							a_div+='<br/>';
					}
				}
				else
				{
					a_div+='<label class="radio"><input type="radio" name="question'+q_id+'" value="1"'+should_check(q_answer,1)+'> True</label><br/>';
					a_div+='<label class="radio"><input type="radio" name="question'+q_id+'" value="0"'+should_check(q_answer,0)+'> False</label><br/>';
				}
				a_div+="</div>";
				oTable.fnUpdate(a_div, nRow, 2, false);
//				oTable.fnUpdate('<a href="#" class="editquiz" title="Edit Quiz">Edit Quiz</a>', nRow, 2, false);
				oTable.fnUpdate('<a href="javascript:void(0)" class="edit btn btn-primary btn-small">Edit</a> <a href="javascript:void(0)" class="delete btn btn-warning btn-small">Delete</a>', nRow, 3, false);
				$(nRow).find('input[type=radio]').attr('disabled',true);

//							oTable.fnDraw();
			}

//******************unit Overview Form*****************************
			var oTable;
			if(quizdefined)
			{
				$('.dt_quiz a.delete').die();
				$('.dt_quiz a.edit').die();
				$('.dt_quiz a.cancel').die();
//				oTable = $('#dt_quiz').dataTable();
			}
//			else
			oTable = $('.dt_quiz').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[3, 5, 10, -1],
					[3, 5, 10, "All"] // change per page values here
				],"aaSorting": [],
					"sScrollY": "400px","bAutoWidth": false,
//				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					},
						"bDestroy": true, "bRetrieve":true
				});//.rowReordering();
			var nEditing = null;
			quizdefined=1;

			//			Adding a New Question  !!!
			$('#btn_new_question').click(function (e) {
//				alert('aaaaaa11111111aaaa');
				e.preventDefault();
				if (nEditing !== null)
				{
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						return false;
					} else {
						restoreRow(oTable, nEditing);
					}
				}
//				aiNew;
				if($('input[name=quiz_choice]:checked').val()==IS_MULTI)
				{
					query='<div class="span12 new_quiz_div" quiz_type="0"><input type="radio" name="new_quiz" checked value="0"/> <input type="text" id="choice1"></br>'+
					'<input type="radio" name="new_quiz" value="1" /> <input type="text" id="choice2"></br>'+
					'<input type="radio" name="new_quiz" value="2" /> <input type="text" id="choice3"></br>'+
					'<input type="radio" name="new_quiz" value="3" /> <input type="text" id="choice4"></div>';
				}
				else
				{
					query='<div class="span12 new_quiz_div" quiz_type="1"><label class="radio"><input type="radio" name="new_quiz" checked value="1"/> True</br>'+
					'<label class="radio"><input type="radio" name="new_quiz" value="0" /> False</br></div>';
				}
				var aiNew = oTable.fnAddData(['<input type="text" class="span12" value="" id="question_no">','<input type="text" class="span12" value="" id="question">',
					query,'<a href="javascript:void(0)" class="edit btn btn-primary btn-small" stats="Save">Save</a> <a href="javascript:void(0)" data-mode="new" class="cancel btn btn-warning btn-small">Cancel</a>']);
				var nRow = oTable.fnGetNodes(aiNew[0]);
				nEditing = nRow;
			});

			//			Deleteing unit

			$('.dt_quiz a.delete').live('click', function (e) {
				e.preventDefault();
				if (confirm("Are you sure to delete this row ?") == false) {
					return;
				}
				var nRow = $(this).parents('tr')[0];

				ajax_helper({'operation':'delete_question','question_id':$(nRow).attr('question_id')},nRow);
//							oTable.fnDeleteRow(nRow);
//							alert("Deleted! Do not forget to do some ajax to sync with backend :)");
			});

			$('.dt_quiz a.cancel').live('click', function (e) {
				e.preventDefault();
				if ($(this).attr("data-mode") == "new") {
					var nRow = $(this).parents('tr')[0];
					oTable.fnDeleteRow(nRow);
				} else {
					restoreRow(oTable, nEditing);
				}
				nEditing=null;
			});

			$('.dt_quiz a.edit').live('click', function (e) {
				e.preventDefault();

				// Get the row as a parent of the link that was clicked on 
				var nRow = $(this).parents('tr')[0];

				if (nEditing !== null && nEditing != nRow) {
					// Currently editing - but not this row - restore the old before continuing to edit mode 
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						oTable.fnDeleteRow(nEditing);
					} else {
						restoreRow(oTable, nEditing);
					}
					editRow(oTable, nRow);
					nEditing = nRow;
				} else if (nEditing == nRow && $(this).attr("stats") == "Save") {
					quiz_type=$('.new_quiz_div').attr('quiz_type');

					if(($("#question_no").val()=="")||($("#question").val()=="")||((quiz_type==IS_MULTI)&&(($("#choice1").val()=="")||($("#choice2").val()=="")||($("#choice3").val()=="")||($("#choice4").val()==""))))
					{
						alert('Fill out the number and question');
						return;
					}

					if($(nRow).attr('question_id'))
					{
						if(quiz_type==IS_MULTI)
						{
							ajax_helper({'operation':'update_question','question_id':$(nEditing).attr('question_id'),'question':$("#question").val(),'question_type':quiz_type,
								'answer':$('input[name=new_quiz]:checked').val(),'choice1':$('#choice1').val(),'choice2':$('#choice2').val(),'question_no':$('#question_no').val(),
								'choice3':$('#choice3').val(),'choice4':$('#choice4').val(),'quiz_id':$(this).closest('table').attr('quiz_id')},nEditing);
						}
						else
						{
							ajax_helper({'operation':'update_question','question_id':$(nEditing).attr('question_id'),'question':$("#question").val(),'question_type':quiz_type,
								'answer':$('input[name=new_quiz]:checked').val(),'question_no':$('#question_no').val(),'quiz_id':$(this).closest('table').attr('quiz_id')},nEditing);
						}
//						ajax_helper({'operation':'update_question','question_id':$(nEditing).attr('question_id'),'question_name':$("#question_name").val()},nEditing);
					}
					else
					{
						if(quiz_type==IS_MULTI)
						{
							ajax_helper({'operation':'add_question','question':$("#question").val(),'question_no':$('#question_no').val(),'question_type':quiz_type,
								'answer':$('input[name=new_quiz]:checked').val(),'choice1':$('#choice1').val(),'choice2':$('#choice2').val(),
								'choice3':$('#choice3').val(),'choice4':$('#choice4').val(),'quiz_id':$(this).closest('table').attr('quiz_id')},nEditing);
						}
						else
						{
							ajax_helper({'operation':'add_question','question':$("#question").val(),'question_no':$('#question_no').val(),'question_type':quiz_type,
								'answer':$('input[name=new_quiz]:checked').val(),'quiz_id':$(this).closest('table').attr('quiz_id')},nEditing);
						}
					}
//						ajax_helper({'operation':'add_car_model','car_model_name':$("#car_model_name").val(),'car_manufacturer_id':$("#manufacturer").val()},nEditing);
				} else {
//								 No edit in progress - let's start one 
					editRow(oTable, nRow);
					nEditing = nRow;
				}
			});
		}
	};

}();

