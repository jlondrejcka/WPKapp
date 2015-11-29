singledefined=0;
overviewdefined=0;
unitdefined=0;

$('.courselink').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/singlecourse/"+$(this).closest('.accordion-group').attr('course_id'),1,$(this).closest('.accordion-group').attr('course_id'));  
//	TableEditable_SingleCourse.init();
//	return false;
});
$('.courselink1').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/singlecourse/"+$(this).attr('course_id'),1,$(this).attr('course_id'));  
//	TableEditable_SingleCourse.init();
//	return false;
});
$('.editcourse').live('click', function (e) {
//	$('#side_accordion .accordion-group[course_id='+$(this).closest('tr').attr('course_id')+']').find('.accordion-body').collapse('show');
/*	if($('#side_accordion .accordion-group[course_id='+$(this).closest('tr').attr('course_id')+']').find('.collapse.in').length==0)
	{
	$('#side_accordion .collapse.in').collapse('hide');
	$('#side_accordion .accordion-group[course_id='+$(this).closest('tr').attr('course_id')+']').find('.collapse').not('.in').collapse('show');//{parent:true});
	}*/
	return load_single_course(base_url+"api/pageapi/singlecourse/"+$(this).closest('tr').attr('course_id'),1,$(this).closest('tr').attr('course_id'));
//	TableEditable_SingleCourse.init();
//	return false;
});
$('.courseoverview').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/courseoverview",0,0);
});

//window.history.replaceState({ type: 1, course_id: 0, single:0, url_toload: "AAA" }, document.title, document.location.href);

window.addEventListener('popstate', function(event) {
  console.log('popstate fired!');
  if(event.state)
	{
	  $('.main_content').html(event.state.content);
		if(event.state.type==0)
			 TableEditable_CourseOverview.init();
		else if(event.state.type==1)
			 TableEditable_SingleCourse.init();
		else if(event.state.type==2)
			 TableEditable_SingleUnit.init();
	}
/*state=event.state;
	if(state.type==1)
	{
		load_single_course(state.url_toload, state.single, state.course_id,1);
	}
	else if(state.type==2)
	{
		load_single_unit(state.unit_id, state.course_id,1);

	}*/
//  updateContent(event.state);
});

    // Store the initial content so we can revisit it later
function load_single_course(url_toload,single,course_id,notsetstate)
{
//	stateObj = { type: 1, course_id: course_id, single:single, url_toload: url_toload };
	if(single)
	{
		$('#side_accordion .active').removeClass("active");
		$($('.accordion-group[course_id='+course_id+'] .accordion-body li')[0]).addClass('active');
		if($('#side_accordion .accordion-group[course_id='+course_id+']').find('.collapse.in').length==0)
		{
		$('#side_accordion .collapse.in').collapse('hide');
		$('#side_accordion .accordion-group[course_id='+course_id+']').find('.collapse').not('.in').collapse('show');//{parent:true});
		}
	}
	else
	{
		$('#side_accordion .collapse.in').collapse('hide');
	}
	$.ajax({
		url: url_toload,
		type: 'POST',
		success: function(msg)
		{
			$('.main_content').html(msg);
			if(single)
			{
//				if(singledefined==0)
				stateObj = { type: 1, content: $('.main_content').html()};
				TableEditable_SingleCourse.init();
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'admin/managecourses/'+course_id);
//				else
//					TableEditable_SingleCourse.init_table();
			}
			else
			{
				stateObj = { type: 0, content: $('.main_content').html()};
				TableEditable_CourseOverview.init();
				window.location.hash='';
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'admin/managecourses');
			}
		}
		}).fail( function(msg)
		{
			alert('Failed Operation:'+JSON.stringify(msg));
		});
	return false;
}

$('.unitlink').live('click', function (e) {
	return load_single_unit($(this).attr('unit_id'),$(this).closest('.accordion-group').attr('course_id'));
});
$('.editunit').live('click', function (e) {
	if(singledefined)
	{
	}

/*	if($('#side_accordion a[unit_id='+$(this).closest('tr').attr('unit_id')+']').closest('.collapse.in').length==0)
	{
	$('#side_accordion .collapse.in').collapse('hide');
	$($('#side_accordion a[unit_id='+$(this).closest('tr').attr('unit_id')+']')[0]).closest('.collapse').not('.in').collapse('show');//{parent:true});//'show');
	}*/
	return load_single_unit($(this).closest('tr').attr('unit_id'),$(this).closest('table').attr('course_id'));
});

function load_single_unit(unit_id,course_id,notsetstate)
{

	
	if($('#side_accordion a[unit_id='+unit_id+']').closest('.collapse.in').length==0)
	{
	$('#side_accordion .collapse.in').collapse('hide');
	$($('#side_accordion a[unit_id='+unit_id+']')[0]).closest('.collapse').not('.in').collapse('show');//{parent:true});//'show');
	}
	
	$('#side_accordion .active').removeClass("active");
	$($('#side_accordion a[unit_id='+unit_id+']')[0]).closest('li').addClass('active');
	$.ajax({
		url: base_url+"api/pageapi/singleunit/"+unit_id,
		type: 'POST',
		success: function(msg)
		{
			$('.main_content').html(msg);
			stateObj = { type: 2, content: $('.main_content').html()};
			TableEditable_SingleUnit.init();
		//	if(notsetstate!=1)
//			{
//				stateObj = { type: 2, course_id: course_id, unit_id:unit_id};
				window.history.pushState(stateObj, null, base_url+'admin/managecourses/'+course_id+'/'+unit_id);
//			}
		}
		}).fail( function(msg)
		{
			alert('Failed Operation:'+JSON.stringify(msg));
		});
	return false;
}

var TableEditable_CourseOverview = function () {
	return {

		//main function to initiate the module
		init: function () {
			function ajax_helper(form_data,nRow)
			{
				$.ajax({
					url: base_url+"api/service/course",
					type: 'POST',
					data: form_data,
					success: function(msg)
					{
						if(msg.success==1)
						{
							if(msg.from=='add')
							{
								$(nEditing).attr('course_id',msg.course.course_id);
								newaccordion='<div class="accordion-group" course_id="'+msg.course.course_id+'"><div class="accordion-heading">';
								newaccordion+='<a href="#collapse'+msg.course.course_id+'" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">';
								newaccordion+='<i class="icon-folder-close"></i>'+msg.course.course_name+'</a></div>';
								newaccordion+='<div class="accordion-body collapse" id="collapse'+msg.course.course_id+'">';
								newaccordion+='<div class="accordion-inner"><ul class="nav nav-list"><li><a href="javascript:void(0)" class="courselink">Overview</a></li>';
								newaccordion+='</ul></div></div></div>';
								$('#side_accordion').html($('#side_accordion').html()+newaccordion);
								saveRow(oTable,nEditing);
								tds=$(nEditing).find('td');
								$(tds[1]).addClass('center');
								$(tds[2]).addClass('center');
								nEditing = null;
							}
							else if(msg.from=='update')
							{
								$('.accordion-group[course_id='+msg.course.course_id+'] .accordion-heading a').html('<i class="icon-folder-close"></i>'+msg.course.course_name);
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else if(msg.from=='delete')
							{
								oTable.fnDeleteRow(nRow);
								$('.accordion-group[course_id='+msg.course_id+']').remove();
							}
						}
						else
						{
							if(msg.from=='update')
							{
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else if(msg.from=='delete')
							{
								alert(msg.message);
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
//							oTable.fnDraw();
			}

			//		Edit Row

			function editRow(oTable, nRow) {

				var aData = oTable.fnGetData(nRow);
				var jqTds = $('>td', nRow);
				jqTds[0].innerHTML = '<input type="text" class="span12" value="' + $(aData[0]).html() + '" id="course_name">';
				jqTds[1].innerHTML='<input type="text" class="span12" value="' + aData[1] + '" id="course_duration">';
				jqTds[2].innerHTML = '<input type="text" class="span12" value="' + aData[2] + '" id="course_price">';
				jqTds[3].innerHTML = '<textarea class="span12" id="course_description">' + aData[3] + '</textarea>';
				jqTds[4].innerHTML ='<a class="edit" href="" stats="Save"><i class="icon-ok"></i></a> <a class="cancel" href=""><i class="icon-remove"></i></a>';
			}

			//		Save Row

			function saveRow(oTable, nRow) {
//							var jqInputs = $('input', nRow);
				oTable.fnUpdate('<a class="editcourse">'+$('#course_name').val()+'</a>', nRow, 0, false);
				oTable.fnUpdate($('#course_duration').val(), nRow, 1, false);

				oTable.fnUpdate($('#course_price').val(), nRow, 2, false);
				oTable.fnUpdate($('#course_description').val(), nRow, 3, false);
				oTable.fnUpdate('<a href="#" class="edit" title="Edit"><i class="icon-pencil"></i></a> <a href="viewstats/'+$(nRow).attr('course_id')+'" class="" title="View"><i class="icon-eye-open"></i></a> <a href="#" class="delete" title="Delete"><i class="icon-trash"></i></a>', nRow, 4, false);
//							oTable.fnDraw();
			}

			if(overviewdefined)
			{
				$('.dt_a a.delete').die();
				$('.dt_a a.edit').die();
				$('.dt_a a.cancel').die();
//				oTable = $('#dt_singlecourse').dataTable();
			}
//******************Course Overview Form*****************************
		   var oTable = $('.dt_a').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[5, 10, 20, -1],
					[5, 10, 20, "All"] // change per page values here
				],
//				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					} ,
						"bDestroy": true, "bRetrieve":true
				});
				overviewdefined=1;
			var nEditing = null;
			
			//			Adding a New course  !!!
			$('#btn_new').click(function (e) {
				e.preventDefault();
				if (nEditing !== null)
				{
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						return false;
					} else {
						restoreRow(oTable, nEditing);
					}
				}
				var aiNew = oTable.fnAddData(['<input type="text" class="span12" value="" id="course_name">','<input type="text" class="span12" value="" id="course_duration">',
					'<input type="text" class="span12" value="" id="course_price">','<textarea class="span12" value="" id="course_description"></textarea>', 
					'<a class="edit" href="" stats="Save"><i class="icon-ok"></i></a> <a class="cancel" data-mode="new" href=""><i class="icon-remove"></i></a>']);
				var nRow = oTable.fnGetNodes(aiNew[0]);
				nEditing = nRow;
			});

			//			Deleteing course

			$('.dt_a a.delete').live('click', function (e) {
				e.preventDefault();
				if (confirm("Are you sure to delete this row ?") == false) {
					return;
				}
				var nRow = $(this).parents('tr')[0];

				ajax_helper({'operation':'delete_course','course_id':$(nRow).attr('course_id')},nRow);
//							oTable.fnDeleteRow(nRow);
//							alert("Deleted! Do not forget to do some ajax to sync with backend :)");
			});

			$('.dt_a a.cancel').live('click', function (e) {
				e.preventDefault();
				if ($(this).attr("data-mode") == "new") {
					var nRow = $(this).parents('tr')[0];
					oTable.fnDeleteRow(nRow);
				} else {
					restoreRow(oTable, nEditing);
				}
				nEditing=null;
			});

			$('.dt_a a.edit').live('click', function (e) {
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

					if(($("#course_name").val()=="")||($("#course_duration").val()=="")||($("#course_price").val()=="")||($("#course_description").val()==""))
					{
						alert('Input Correct Information');
						return;
					}
					else if( !isNumber($("#course_price").val()) || !isNumber($("#course_duration").val()))
					{
						alert('Price and Duration has to be an integer value');
						return;
					}
//								 Editing this row and want to save it 
					if($(nRow).attr('course_id'))
						ajax_helper({'operation':'update_course','course_id':$(nEditing).attr('course_id'),'course_name':$("#course_name").val(),
						'price':$("#course_price").val(),'description':$("#course_description").val(),'duration':$("#course_duration").val()},nEditing);
					else
						ajax_helper({'operation':'add_course','course_name':$("#course_name").val(),
						'price':$("#course_price").val(),'description':$("#course_description").val(),'duration':$("#course_duration").val()},nEditing);
//									ajax_helper({'operation':'add_car_model','car_model_name':$("#car_model_name").val(),'car_manufacturer_id':$("#manufacturer").val()},nEditing);
				} else {
//								 No edit in progress - let's start one 
					editRow(oTable, nRow);
					nEditing = nRow;
				}
			});
		}
	};

}();

