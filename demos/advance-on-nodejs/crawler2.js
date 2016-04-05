
var http = require('http');
var cheerio = require('cheerio');
var fs = require('fs');
var url = 'http://www.imooc.com/learn/348';

/*  
	结构
	[{
		chapterTItle: '',
		videos: [
			title: '',
			id: ''
		]
	}]

 */
function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.learnchapter');

	var courseData = [];

	chapters.each(function(item) {
		var chapter = $(this);
		var chapterTitle = chapter.find('strong').text();
		var videos = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitle: chapterTItle,
			videos: []
		}

		videos.each(function(item) {
			var video = $(this).find('.studyvideo');
			var videoTitle = video.text();
			var id = video.attr('href').slit('video/')[1];

			chapterData.videos.push({
				title: videoTItle,
				id: id
			});
		})

		courseData.push(chapterData);

		return courseData;
	})
}

function printCourseInfo(courseData) {
	courseData.forEach(function(item) {
		var chapterTitle = item.chapterTitle;

		console.log(chapterTitle + '\n');

		item.videos.forEach(function(video) {
			console.log('  [', video.id + ']', video.title, '\n');
		})
	})
}

http.get(url, function(res) {
	var html = '';

	res.on('data', function(data) {
		html += data;
	});

	res.on('end', function() {

		var courseData = filterChapters(html);
		printCourseInfo(courseData);
	});

}).on('error', function() {
	console.log('获取课程数据出错');
})