singledefined=0;
overviewdefined=0;
unitdefined=0;

$('.gotocourse1').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/mycourse/"+$(this).closest('.accordion-group').attr('uc_id'),1,$(this).closest('.accordion-group').attr('uc_id'));  
//	TableEditable_SingleCourse.init();
//	return false;
});
$('.gotocourse').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/mycourse/"+$(this).closest('tr').attr('uc_id'),1,$(this).closest('tr').attr('uc_id'));  
//	TableEditable_SingleCourse.init();
//	return false;
});

$('.courseoverview').live('click', function (e) {
	return load_single_course(base_url+"api/pageapi/mycourseoverview",0,0);
});


window.addEventListener('popstate', function(event) {
  console.log('popstate fired!');
  if(event.state)
	{
	  $('.main_content').html(event.state.content);
		if(event.state.type==0)
			 TableEditable_CourseOverview.init();
/*		else if(event.state.type==1)
			 TableEditable_SingleCourse.init();
		else if(event.state.type==2)
			 TableEditable_SingleUnit.init();*/
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
//				TableEditable_SingleCourse.init();
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'student/mycourses/'+course_id);
//				else
//					TableEditable_SingleCourse.init_table();
			}
			else
			{
				stateObj = { type: 0, content: $('.main_content').html()};
				TableEditable_CourseOverview.init();
//				window.location.hash='';
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'student/mycourses');
			}
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
							if(msg.from=='delete')
							{
								oTable.fnDeleteRow(nRow);
								$('.accordion-group[course_id='+msg.course_id+']').remove();
							}
						}
						else
						{
							if(msg.from=='delete')
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



			if(overviewdefined)
			{
				$('.dt_a a.delete').die();
				$('.dt_a a.edit').die();
				$('.dt_a a.cancel').die();
//				oTable = $('#dt_singlecourse').dataTable();
			}

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
			

			//			Deleteing course

			$('.dt_a a.delete').live('click', function (e) {
				e.preventDefault();
				if (confirm("Are you sure to delete this row ?") == false) {
					return;
				}
				var nRow = $(this).parents('tr')[0];

//				ajax_helper({'operation':'delete_course','course_id':$(nRow).attr('course_id')},nRow);
//							oTable.fnDeleteRow(nRow);
//							alert("Deleted! Do not forget to do some ajax to sync with backend :)");
			});


		}
	};

}();

